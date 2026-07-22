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

      //These are configuration options for the Razorpay Checkout SDK.
      const options = {
        key,
        amount: Math.round(amount * 100),
        currency: 'INR',
        name: 'SwiftCart',
        description: 'Ecommerce Website Payment Transaction',
        order_id: order.id,

        //using callback we would have been redirected to the backend route 
        //only on payment success
        handler: async function (response) {
          const { data } = await axios.post('/api/v1/paymentVerification', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          })
          // intruder could have redirected us to somewhere else if we didn't control this handling, using devtools
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
      /*
      The Backend Order: Your server creates an order using the backend SDK and sends the order_id to the frontend.
      The Frontend Options: You pass that order_id, your public API key, currency, design themes, and customer details into the frontend options object.
      The Initialization: You pass those options into new window.Razorpay(options) to render the credit card, UPI, and net banking payment UI.
      */
      // this is browser sdk, in backend it was a different sdk
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


/*
Now suppose the user

presses Esc
closes the browser
loses internet
changes their mind

No payment happens.

Step 3

Nothing changes.

Inside Razorpay it still looks like

Order ID : order_A1B2C3

Status : created

No money was deducted.

No payment ID exists.

No signature exists.

Does Razorpay delete it?

Generally no.

It remains as an unpaid order in Razorpay's records. It serves as an audit trail of payment attempts.

Think of it like this.

You create an invoice.

Invoice #123

Amount : ₹2000

Status : Unpaid

If the customer never pays,

does the invoice disappear?

No.

It simply stays

UNPAID

Razorpay orders behave similarly.

Does this affect your application?

Not unless you save something.

Notice your backend currently does

const order = await instance.orders.create(...)

res.json(order)

You never store that order in MongoDB.

So if the customer closes the popup,

your database doesn't even know anything happened.

Only Razorpay has that order.
*/