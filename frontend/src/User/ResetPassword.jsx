import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ResetPassword() {
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams()

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const data = {
            password,
            confirmPassword,
        }
        dispatch(resetPassword({ token, userData: data }))

    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    useEffect(() => {
        if (success) {
            toast.success("Password Reset Successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/login")
        }
    }, [dispatch, success, navigate])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <PageTitle title="Reset Password" />
                <div className="flex justify-center items-center min-h-[80vh] w-full max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-[20px] box-border mx-auto my-[50px]">
                    <div className="flex justify-center items-center min-h-[300px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                        <form className="w-full" onSubmit={resetPasswordSubmit}>
                            <h2 className="text-center text-[#6C5B7B] mb-5 text-2xl font-bold">Reset Password</h2>
                            <div className="flex flex-col mb-[15px]">
                                <input type="password" name="password" placeholder='Enter your new Password' value={password} onChange={(e) => setPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <div className="flex flex-col mb-[15px]">
                                <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <button className="w-full bg-[#6C5B7B] text-[#EAE7E0] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#4E4A59]">Reset Password</button>
                        </form>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default ResetPassword
