import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeErrors, removeSuccess, updatePassword } from '../features/user/userSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function UpdatePassword() {
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword)
        myForm.set("newPassword", newPassword)
        myForm.set("confirmPassword", confirmPassword);
        // for (let pair of myForm.entries()) {
        //     console.log(pair[0] + '-' + pair[1]);
        // }
        dispatch(updatePassword(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Password Updated successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/profile")
        }
    }, [dispatch, success, navigate])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="Password Update" />
                <div className="flex justify-center items-center h-[60vh] w-full mt-[60px] md:mt-[70px] max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-[20px] box-border mx-auto mb-[50px]">
                    <div className="flex justify-center items-center min-h-[300px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                        <form className="w-full" onSubmit={updatePasswordSubmit}>
                            <h2 className="text-center text-[#6C5B7B] mb-5 text-2xl font-bold">Update Password</h2>
                            <div className="flex flex-col mb-[15px]">
                                <input type="password" name="oldPassword" placeholder='Old Password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <div className="flex flex-col mb-[15px]">
                                <input type="password" name="newPassword" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <div className="flex flex-col mb-[15px]">
                                <input type="password" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <button className="w-full bg-[#6C5B7B] text-[#EAE7E0] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#4E4A59]">Update Password</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </>)}
        </>
    )
}

export default UpdatePassword
