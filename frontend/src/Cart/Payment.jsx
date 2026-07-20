import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Payment() {
  const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
  const { user } = useSelector(state => state.user)
  const { shippingInfo } = useSelector(state => state.cart)
  const navigate = useNavigate();
  const completePayment = async (amount) => {
    try {
      const { data: keyData } = await axios.get('/api/v1/getKey');
      const { key } = keyData;

      const { data: orderData } = await axios.post('/api/v1/payment/process', { amount });
      const { order } = orderData

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'SwiftCart',
        description: 'Ecommerce Website Payment Transaction',
        order_id: order.id,
        handler: async function (response) {
          const { data } = await axios.post('/api/v1/paymentVerification', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          })
          if (data.success) {
            navigate(`/paymentSuccess?reference=${data.reference}`)
          } else {
            alert('Payment verification Failed')
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber
        },
        theme: {
          color: '#3399cc'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });

    }
  }
  return (
    <>
      <PageTitle title="Payment Processing" />
      <Navbar />
      <CheckoutPath activePath={2} />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-[40vh] gap-4 md:gap-8 my-10 px-6 w-full max-w-[600px] mx-auto mb-20">
        <Link to="/order/confirm" className="w-full md:w-auto px-8 py-4 text-base md:text-lg rounded-xl transition-all duration-300 font-semibold border-2 border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-600 hover:text-white hover:border-gray-600 shadow-sm hover:shadow-md text-center">Go Back</Link>
        <button className="w-full md:w-auto px-10 py-4 text-base md:text-lg rounded-xl transition-all duration-300 font-bold border-none text-white bg-[#3B3B4F] hover:bg-[#2E2E3C] shadow-lg hover:shadow-xl hover:-translate-y-1 text-center" onClick={() => completePayment(orderItem.total)}>Pay ({orderItem.total})/-</button>
      </div>
      <Footer />
    </>
  )
}

export default Payment
