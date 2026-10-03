import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { toast } from 'react-toastify'
import { clearCart } from '../features/cart/cartSlice';

function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const reference = searchParams.get('reference');
    const { cartItems, shippingInfo } = useSelector(state => state.cart); //though we had them in localStorage
    const { loading, success, error } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrderData = async () => {
            try {
                const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
                if (!orderItem) return; //on refresh, reading null --> prevented re-ordering or order triggering again.
                const orderData = {
                    shippingInfo: {
                        address: shippingInfo.address,
                        city: shippingInfo.city,
                        state: shippingInfo.state,
                        country: shippingInfo.country,
                        pinCode: shippingInfo.pinCode,
                        phoneNo: shippingInfo.phoneNumber
                    },
                    orderItems: cartItems.map((item) => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        product: item.product,
                    })),
                    paymentInfo: {
                        id: reference,
                        status: 'succeeded'
                    },
                    itemPrice: orderItem.subtotal,
                    taxPrice: orderItem.tax,
                    shippingPrice: orderItem.shippingCharges,
                    totalPrice: orderItem.total,

                }
                dispatch(createOrder(orderData))
                sessionStorage.removeItem('orderItem')
            } catch (error) {
                toast.error(error.message || 'Order Creation Error', { position: 'top-center', autoClose: 3000 })
            }
        }
        createOrderData()
    }, []);
    useEffect(() => {
        if (success) {
            toast.success('Order Placed', { position: 'top-center', autoClose: 3000, toastId: 'order-placed' });
            dispatch(clearCart())
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            //error i was sending success toast with error
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <PageTitle title="Payment Status" />
                <Navbar />
                <div className="flex min-h-screen flex-col items-center justify-center p-6 pt-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-600">
                            <div className="-mt-1.5 h-10 w-5 rotate-45 border-solid border-white border-r-[6px] border-b-[6px]"></div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-green-600">Order Confirmed!</h1>
                        <p className="my-6 text-slate-500">Your payment was successful. Reference ID <strong className="text-slate-700">{reference}</strong></p>
                        <Link className="rounded-md bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-indigo-700" to="/orders/user">View Orders</Link>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default PaymentSuccess
