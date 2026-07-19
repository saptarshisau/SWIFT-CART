import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, removeSuccess } from '../features/user/userSlice';
function UserDashboard({ user }) {
    // const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    function toggleMenu() {
        setMenuVisible(!menuVisible)
    }
    const options = [
        { name: 'Orders', funcName: orders },
        { name: 'Account', funcName: profile },
        // { name: `Cart(${cartItems.length})`, funcName: myCart, isCart: true },
        { name: 'Logout', funcName: logoutUser },
    ]
    if (user.role === 'admin') {
        options.unshift({
            name: 'Admin Dashboard', funcName: dashboard
        })
    }
    function orders() {
        navigate("/orders/user")
    }
    function profile() {
        navigate("/profile")
    }
    function myCart() {
        navigate("/cart")
    }
    function logoutUser() {
        dispatch(logout()) //you're handling the result immediately after the API call, without storing an extra success flag in Redux.
            .unwrap() //BY REDUX TOOLKIT, we are getting a promise, we have to unwrap it to get the response, on success we are redirecting and showing a toast for success
            //Redux Toolkit internally executes your async function, waits for the Axios promise to finish, dispatches the appropriate actions, and then returns its own promise from dispatch().
            //dispatch(logout()) this is a redux promise, .unwrap() extracts the value that your thunk returned
            .then(() => {
                toast.success('Logout Successful', { position: 'top-center', autoClose: 3000 })
                dispatch(removeSuccess())
                navigate('/login')
            })
            .catch((error) => {
                toast.success(error.message || 'Logout Failed', { position: 'top-center', autoClose: 3000 })
            })

    }
    function dashboard() {
        navigate("/admin/dashboard")

    }
    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/60 z-[999] transition-all duration-300 ease-in-out ${menuVisible ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={toggleMenu}></div>
            <div className="dashboard-container">
                <div className="flex items-center cursor-pointer px-[15px] py-[5px] fixed top-0 right-0 z-[1000] transition-colors duration-300 ease-in-out mr-[40px] mb-[5px] max-[1400px]:right-[-50px] max-[780px]:top-[5px] max-[780px]:right-[-40px]" onClick={toggleMenu}>
                    <img src={user.avatar.url ? user.avatar.url : './images/profile.png'} alt="Profile Picture" className="w-[50px] h-[50px] rounded-full mr-[15px] object-cover border-2 border-[var(--border-color)] max-[780px]:w-[40px] max-[780px]:h-[40px]" />
                    <span className="text-[18px] font-bold text-[var(--text-light)] max-[1400px]:text-[16px]">{user.name || 'User'}</span>
                </div>
                {menuVisible && (<div className="p-[15px] rounded-[8px] fixed top-[55px] right-[20px] w-[150px] z-[1000] max-[1400px]:top-[50px] max-[1400px]:right-[-10px]">
                    {options.map((item) => (
                        <button key={item.name} className={`w-full p-[12px] mb-[10px] border-none rounded-[8px] text-[16px] cursor-pointer transition-colors duration-300 ease-in-out shadow-[var(--shadow-sm)] hover:bg-[var(--primary-light)] hover:text-[var(--text-dark)] `} onClick={item.funcName}>{item.name}</button>
                        // ${item.isCart && cartItems.length > 0 ? 'bg-[var(--primary-light)] text-[var(--text-dark)]' : 'bg-[var(--primary-main)] text-[var(--text-light)]'}
                    ))}
                </div>)}
            </div>
        </>
    )
}

export default UserDashboard
