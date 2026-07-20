import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    FiPackage,
    FiUser,
    FiLogOut,
    FiLayout,
    FiShoppingCart,
    FiChevronRight,
} from 'react-icons/fi';
import { logout, removeSuccess } from '../features/user/userSlice';

function UserDashboard({ user }) {
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuVisible, setMenuVisible] = useState(false);

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    }

    const options = [
        {
            name: 'Orders',
            icon: <FiPackage size={18} />,
            funcName: orders,
        },
        {
            name: 'Account',
            icon: <FiUser size={18} />,
            funcName: profile,
        },
        {
            name: `Cart(${cartItems.length})`,
            icon: <FiShoppingCart size={18} />,
            funcName: myCart,
            isCart: true,
        },
        {
            name: 'Logout',
            icon: <FiLogOut size={18} />,
            funcName: logoutUser,
            danger: true,
        },
    ];

    if (user.role === 'admin') {
        options.unshift({
            name: 'Admin Dashboard',
            icon: <FiLayout size={18} />,
            funcName: dashboard,
        });
    }

    function orders() {
        navigate('/orders/user');
    }

    function profile() {
        navigate('/profile');
    }

    function myCart() {
        navigate('/cart');
    }

    function logoutUser() {
        dispatch(logout()) //you're handling the result immediately after the API call, without storing an extra success flag in Redux.
            .unwrap() //BY REDUX TOOLKIT, we are getting a promise, we have to unwrap it to get the response, on success we are redirecting and showing a toast for success
            //Redux Toolkit internally executes your async function, waits for the Axios promise to finish, dispatches the appropriate actions, and then returns its own promise from dispatch().
            //dispatch(logout()) this is a redux promise, .unwrap() extracts the value that your thunk returned
            .then(() => {
                toast.success('Logout Successful', {
                    position: 'top-center',
                    autoClose: 3000,
                });

                dispatch(removeSuccess());

                navigate('/login');
            })
            .catch((error) => {
                toast.error(error.message || 'Logout Failed', {
                    position: 'top-center',
                    autoClose: 3000,
                });
            });
    }

    function dashboard() {
        navigate('/admin/dashboard');
    }

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[999] bg-black/30 backdrop-blur-[2px] transition-all duration-300 ${menuVisible
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                    }`}
                onClick={toggleMenu}
            ></div>

            <div className="dashboard-container">
                {/* Profile Button */}
                <div
                    onClick={toggleMenu}
                    className="fixed top-3 right-8 z-[1000] flex cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl max-[780px]:right-3"
                >
                    <img
                        src={
                            user.avatar.url
                                ? user.avatar.url
                                : './images/profile.png'
                        }
                        alt="Profile Picture"
                        className="h-11 w-11 rounded-full border-2 border-indigo-500 object-cover max-[780px]:h-10 max-[780px]:w-10"
                    />

                    <div className="hidden md:block">
                        <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                            {user.name || 'User'}
                        </p>

                        <p className="text-xs text-slate-500 capitalize">
                            {user.role}
                        </p>
                    </div>
                </div>

                {/* Dropdown */}
                <div
                    className={`fixed top-[72px] right-8 z-[1000] w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-200 max-[780px]:right-3 ${menuVisible
                        ? 'visible scale-100 opacity-100'
                        : 'pointer-events-none invisible scale-95 opacity-0'
                        }`}
                >
                    {/* User Header */}
                    <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                        <p className="truncate text-base font-semibold text-slate-900">
                            {user.name}
                        </p>

                        <p className="truncate text-sm text-slate-500">
                            {user.email}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        {options.map((item) => (
                            <button
                                key={item.name}
                                onClick={item.funcName}
                                className={`flex w-full items-center justify-between px-5 py-3 text-left transition-all duration-200 ${item.danger
                                    ? 'text-red-600 hover:bg-red-50'
                                    : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {item.icon}

                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                </div>

                                <FiChevronRight
                                    size={16}
                                    className="text-slate-400"
                                />
                            </button>

                            // ${item.isCart && cartItems.length > 0 ? 'bg-[#F8B5B1] text-[#000000]' : 'bg-[#6C5B7B] text-[#FFFFFF]'}
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;