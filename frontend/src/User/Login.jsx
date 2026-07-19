import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeErrors, removeSuccess } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const { error, loading, success, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get("redirect") || "/"
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [isAuthenticated, navigate, redirect])
    useEffect(() => {
        if (success) {
            toast.success('Login Successful', { position: 'top-center', autoClose: 3000 })
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className="flex justify-center items-center h-[80vh] min-h-screen w-full max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-5 box-border mx-auto">
                        <div className="flex justify-center items-center min-h-[300px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                            <form className="w-full" onSubmit={loginSubmit}>
                                <div className="flex flex-col mb-[15px]">
                                    <input type="email" placeholder='Email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                                </div>
                                <div className="flex flex-col mb-[15px]">
                                    <input type="password" placeholder='Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                                </div>
                                <button className="w-full bg-[var(--primary-main)] text-[var(--text-primary)] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[var(--primary-dark)]">Sign In</button>
                                <p className="text-center text-[14px] text-[#555] mt-[10px]">Forgot your password? <Link to="/password/forgot" className="text-[var(--border-color)] ml-[10px] hover:underline">Reset Here</Link></p>
                                <p className="text-center text-[14px] text-[#555] mt-[10px]">Don't have an account? <Link to="/register" className="text-[var(--border-color)] ml-[10px] hover:underline">Sign up here</Link></p>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Login
