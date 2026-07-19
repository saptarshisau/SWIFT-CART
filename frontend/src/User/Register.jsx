import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';
function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('./images/profile.png')
    const { name, email, password } = user;
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]); //e.target.files is an array-like object.
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error('Please fill out all the required fields', { position: 'top-center', autoClose: 3000 })
            return;
        }
        const myForm = new FormData(); //FormData is a built-in browser object used to send form data, especially when files are involved.
        myForm.set('name', name)
        myForm.set('email', email)
        myForm.set('password', password)
        myForm.set('avatar', avatar)

        //key-value pair stored here and sent as form data 
        // console.log([...myForm.entries()]); //this shows the array of key value pairs (form data iterator)
        // for (let pair of myForm.entries()) {
        //     console.log(pair[0] + '-' + pair[1]); //base64-encoded 
        // }

        dispatch(register(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Registration SuccessFul", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate('/login')
        }
    }, [dispatch, success, navigate])
    return (
        <div className="flex justify-center items-center h-[80vh] min-h-screen w-full max-w-[600px] rounded-[10px] shadow-[0_8px_15px_rgba(0,0,0,0.1)] overflow-hidden p-[15px] md:p-5 box-border mx-auto">
            <div className="flex justify-center items-center min-h-[300px] w-full max-w-[400px] bg-[rgb(246,243,243)] p-5 transition-all duration-500 ease-in-out rounded-[10px]">
                <form className="w-full" onSubmit={registerSubmit} encType="multipart/form-data">
                    {/* Without this attribute, the web browser will not transmit the actual file data to the server; it will only send the file's name as a plain text string.*/}
                    <h2 className="text-center text-[var(--primary-main)] mb-5 text-2xl font-bold">Sign Up</h2>
                    <div className="flex flex-col mb-[15px]">
                        <input type="text" placeholder='Username' name="name" value={name} onChange={registerDataChange} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                    </div>
                    <div className="flex flex-col mb-[15px]">
                        <input type="email" placeholder='Email' name="email" value={email} onChange={registerDataChange} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                    </div>
                    <div className="flex flex-col mb-[15px]">
                        <input type="password" placeholder='Password' name="password" value={password} onChange={registerDataChange} className="p-[12px] text-[14px] md:p-[14px] md:text-[16px] border border-[#ccc] rounded-[5px]" />
                    </div>
                    <div className="flex flex-row items-center gap-[10px] mb-[15px]">
                        <input type="file" name="avatar" className="p-2 rounded-[5px] border border-[#ccc] text-[14px] w-[80%]" accept='image/' onChange={registerDataChange} />
                        <img src={avatarPreview} alt="Avatar Preview" className="w-[50px] h-[50px] object-cover rounded-full" />
                    </div>
                    <button className="w-full bg-[var(--primary-main)] text-[var(--text-primary)] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[var(--primary-dark)]">{loading ? 'Signing Up' : 'Sign Up'}</button>
                    <p className="text-center text-[14px] text-[#555] mt-[10px]">
                        Already have an account?<Link to="/login" className="text-[var(--border-color)] ml-[10px] hover:underline">Sign in here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
