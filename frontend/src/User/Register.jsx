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
    const [submitted, setSubmitted] = useState(false)
    const [touched, setTouched] = useState({})
    const markTouched = (e) => setTouched(t => ({ ...t, [e.target.name]: true }))
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
            if (!e.target.files[0]) return;
            reader.readAsDataURL(e.target.files[0]); //e.target.files is an array-like object.
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const checks = {
        name: name.trim().length > 0,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()),
        password: password.length >= 8,
        avatar: !!avatar
    }
    const allValid = Object.values(checks).every(Boolean)
    const errorMessages = {
        name: 'Username is required',
        email: 'Please enter a valid email address (e.g. name@gmail.com)',
        password: 'Password must be at least 8 characters long',
        avatar: 'Please upload a profile picture'
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if (!allValid) {
            Object.keys(checks)
                .filter(key => !checks[key])
                .forEach(key => toast.error(errorMessages[key], { position: 'top-center', autoClose: 3000, toastId: key }))
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
                    <h2 className="text-center text-[#6C5B7B] mb-5 text-2xl font-bold">Sign Up</h2>
                    <p className="text-[12px] text-[#555] bg-[#EAE7E0] rounded-[5px] p-2 mb-[15px]">
                        All fields are <span className="text-red-500 font-bold">required</span>. You'll need a username, a <b>valid email</b> (Gmail, Yahoo, Hotmail, etc.), a password of <b>at least 8 characters</b> and a <b>profile picture</b>.
                    </p>
                    <div className="flex flex-col mb-[15px]">
                        <label htmlFor="name" className="text-[13px] font-semibold text-[#6C5B7B] mb-1">Username <span className="text-red-500">*</span></label>
                        <input id="name" type="text" placeholder='Username' name="name" value={name} onChange={registerDataChange} onBlur={markTouched} className={`p-[12px] text-[14px] md:p-[14px] md:text-[16px] border rounded-[5px] ${(touched.name || submitted) && !checks.name ? 'border-red-500' : checks.name ? 'border-green-500' : 'border-[#ccc]'}`} />
                        <p className={`text-[12px] mt-1 ${checks.name ? 'text-green-600' : (touched.name || submitted) ? 'text-red-500' : 'text-[#777]'}`}>{checks.name ? '✓' : '•'} Username is required</p>
                    </div>
                    <div className="flex flex-col mb-[15px]">
                        <label htmlFor="email" className="text-[13px] font-semibold text-[#6C5B7B] mb-1">Email <span className="text-red-500">*</span></label>
                        <input id="email" type="email" placeholder='yourname@example.com' name="email" value={email} onChange={registerDataChange} onBlur={markTouched} className={`p-[12px] text-[14px] md:p-[14px] md:text-[16px] border rounded-[5px] ${(touched.email || submitted) && !checks.email ? 'border-red-500' : checks.email ? 'border-green-500' : 'border-[#ccc]'}`} />
                        <p className={`text-[12px] mt-1 ${checks.email ? 'text-green-600' : (touched.email || submitted) ? 'text-red-500' : 'text-[#777]'}`}>{checks.email ? '✓' : '•'} Must be a valid email address (Gmail, Yahoo, Hotmail...)</p>
                    </div>
                    <div className="flex flex-col mb-[15px]">
                        <label htmlFor="password" className="text-[13px] font-semibold text-[#6C5B7B] mb-1">Password <span className="text-red-500">*</span></label>
                        <input id="password" type="password" placeholder='Minimum 8 characters' name="password" value={password} onChange={registerDataChange} onBlur={markTouched} className={`p-[12px] text-[14px] md:p-[14px] md:text-[16px] border rounded-[5px] ${(touched.password || submitted) && !checks.password ? 'border-red-500' : checks.password ? 'border-green-500' : 'border-[#ccc]'}`} />
                        <p className={`text-[12px] mt-1 ${checks.password ? 'text-green-600' : (touched.password || submitted) ? 'text-red-500' : 'text-[#777]'}`}>{checks.password ? '✓' : '•'} At least 8 characters ({password.length}/8)</p>
                    </div>
                    <div className="mb-[15px]">
                        <label htmlFor="avatar" className="text-[13px] font-semibold text-[#6C5B7B] mb-1 block">Profile picture <span className="text-red-500">*</span></label>
                        <div className="flex flex-row items-center gap-[10px]">
                            <input id="avatar" type="file" name="avatar" className={`p-2 rounded-[5px] border text-[14px] w-[80%] ${submitted && !checks.avatar ? 'border-red-500' : checks.avatar ? 'border-green-500' : 'border-[#ccc]'}`} accept='image/*' onChange={registerDataChange} />
                            <img src={avatarPreview} alt="Avatar Preview" className="w-[50px] h-[50px] object-cover rounded-full" />
                        </div>
                        <p className={`text-[12px] mt-1 ${checks.avatar ? 'text-green-600' : (touched.avatar || submitted) ? 'text-red-500' : 'text-[#777]'}`}>{checks.avatar ? '✓' : '•'} Please upload a profile picture</p>
                    </div>
                    <button className="w-full bg-[#6C5B7B] text-[#EAE7E0] border-none p-[10px] text-[14px] md:p-[14px] md:text-[16px] rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#4E4A59]">{loading ? 'Signing Up' : 'Sign Up'}</button>
                    <p className="text-center text-[14px] text-[#555] mt-[10px]">
                        Already have an account?<Link to="/login" className="text-[#5C4A6F] ml-[10px] hover:underline">Sign in here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
