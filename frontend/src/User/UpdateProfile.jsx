import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice';
import Loader from '../components/Loader';

function UpdateProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('./images/profile.png');
    const { user, error, success, message, loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileImageUpdate = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.onerror = () => {
            toast.error('Error reading file')
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const updateSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            //not error.message
            dispatch(removeErrors())
        }
    }, [dispatch, error])

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/profile")
        }
    }, [dispatch, success, navigate, message])
    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar?.url || './images/profile.png') //i was using setAvatar lol, worst error ever
        }
    }, [user])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <div className="flex justify-center items-center h-[60vh] w-full mt-[60px] md:mt-[70px] max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-[20px] box-border mx-auto mb-[50px]">
                    <div className="flex justify-center items-center min-h-[300px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                        <form className="w-full" encType='multipart/form-data' onSubmit={updateSubmit}>
                            <h2 className="text-center text-[#6C5B7B] mb-5 text-2xl font-bold">Update Profile</h2>
                            <div className="flex flex-row items-center gap-[10px] mb-[15px]">
                                <input type="file" accept="image/" className="p-2 rounded-[5px] border border-[#ccc] text-[14px] w-[80%]" name="avatar" onChange={profileImageUpdate} />
                                <img src={avatarPreview} alt="User Profile" className="w-[50px] h-[50px] object-cover rounded-full" />
                            </div>
                            <div className="flex flex-col mb-[15px]">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <div className="flex flex-col mb-[15px]">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                            </div>
                            <button className="w-full bg-[#6C5B7B] text-[#EAE7E0] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#4E4A59]">Update</button>
                        </form>
                    </div>
                </div>

                <Footer />
            </>)}
        </>
    )
}

export default UpdateProfile
