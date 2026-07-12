import { useEffect } from 'react'
import '../CartStyles/PaymentSuccess.css'
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, removeErrors, removeSuccess } from '../features/order/orderSlice';
import { toast } from 'react-toastify'

function PaymentSuccess() {
    const [searchParams] = useSearchParams
    return (
        <div>PaymentSuccess</div>
    )
}

export default PaymentSuccess