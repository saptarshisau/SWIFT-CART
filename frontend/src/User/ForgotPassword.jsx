import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ForgotPassword() {
    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const forgotPasswordEmail = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email)
        dispatch(forgotPassword(myForm))
        setEmail("");
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
        }
    }, [dispatch, success, message])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <PageTitle title="Forgot Password" />
                <Navbar />
                <div className="flex justify-center items-center h-[60vh] w-full mt-[30px] max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-[20px] box-border mx-auto mb-[50px]">
                    <div className="flex justify-center items-center min-h-[100px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                        <form className="w-full" onSubmit={forgotPasswordEmail}>
                            <h2 className="text-center text-[#6C5B7B] mb-5 text-2xl font-bold">Forgot Password</h2>
                            <div className="flex flex-col mb-[15px]">
                                <input type="email" placeholder='Enter your registered email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <button className="w-full bg-[#6C5B7B] text-[#EAE7E0] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#4E4A59]">Send</button>
                        </form>
                    </div>
                </div>

                <Footer />
            </>)}
        </>
    )
}

export default ForgotPassword
