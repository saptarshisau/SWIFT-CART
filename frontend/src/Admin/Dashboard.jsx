import { useEffect } from 'react';
import {
    AddBox,
    AttachMoney,
    CheckCircle,
    Dashboard as DashboardIcon,
    Error,
    Instagram,
    Inventory,
    LinkedIn,
    People,
    ShoppingCart,
    Star,
    YouTube
} from '@mui/icons-material'
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders } from '../features/admin/adminSlice';

function Dashboard() {
    const { products, orders, totalAmount } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminProducts())
        dispatch(fetchAllOrders())
    }, [dispatch])
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const outOfStock = products.filter(product => product.stock === 0).length;
    const inStock = products.filter(product => product.stock > 0).length;
    const totalReviews = products.reduce((acc, product) => acc + (product.reviews.length || 0), 0)
    return (
        <>
            <Navbar />
            <PageTitle title="Admin Dashboard" />
            <div className="flex bg-[#f5f5f5] min-h-screen pt-[60px]">
                <div className="w-[270px] bg-[#4E4A59] text-white p-5 pb-12 fixed top-[60px] h-[calc(100vh-60px)] overflow-y-auto hidden md:block z-10">
                    <div className="flex items-center gap-3 text-xl font-bold mb-8 pb-5 border-b border-white/10">
                        <DashboardIcon fontSize="large" />
                        Admin Dashboard
                    </div>
                    <nav className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Products</h3>
                            <Link to="/admin/products" className="text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm hover:bg-white/10 hover:translate-x-1">
                                <Inventory fontSize="small" />
                                All Products
                            </Link>
                            <Link to="/admin/product/create" className="text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm hover:bg-white/10 hover:translate-x-1">
                                <AddBox fontSize="small" />
                                Create Product
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Users</h3>
                            <Link to="/admin/users" className="text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm hover:bg-white/10 hover:translate-x-1">
                                <People fontSize="small" />
                                All Users
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Orders</h3>
                            <Link to="/admin/orders" className="text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm hover:bg-white/10 hover:translate-x-1">
                                <ShoppingCart fontSize="small" />
                                All Orders
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">Reviews</h3>
                            <Link to="/admin/reviews" className="text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 text-sm hover:bg-white/10 hover:translate-x-1">
                                <Star fontSize="small" />
                                All Reviews
                            </Link>
                        </div>
                    </nav>
                </div>

                <div className="flex-1 p-5 md:p-8 md:ml-[270px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <Inventory className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">Total Products</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{totalProducts}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <ShoppingCart className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">Total Orders</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{totalOrders}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <Star className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">Total Reviews</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{totalReviews}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <AttachMoney className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">Total Revenue</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{totalAmount}/-</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <Error className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">Out Of Stock</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{outOfStock}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <CheckCircle className="text-[#6C5B7B] mb-4" fontSize="large" />
                            <h3 className="my-2 text-gray-500 text-sm font-medium">In Stock</h3>
                            <p className="text-3xl font-bold text-gray-800 mt-1">{inStock}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <Instagram className="text-[#E1306C] mb-4" fontSize="large" />
                            <h3 className="my-3 text-gray-800 text-xl font-bold">Instagram</h3>
                            <p className="text-gray-500 my-1 text-sm">123K Followers</p>
                            <p className="text-gray-500 my-1 text-sm">12 posts</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <LinkedIn className="text-[#0077B5] mb-4" fontSize="large" />
                            <h3 className="my-3 text-gray-800 text-xl font-bold">LinkedIn</h3>
                            <p className="text-gray-500 my-1 text-sm">55K Followers</p>
                            <p className="text-gray-500 my-1 text-sm">6 posts</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl text-center shadow-sm hover:-translate-y-1 transition-transform duration-300">
                            <YouTube className="text-[#FF0000] mb-4" fontSize="large" />
                            <h3 className="my-3 text-gray-800 text-xl font-bold">YouTube</h3>
                            <p className="text-gray-500 my-1 text-sm">45K Followers</p>
                            <p className="text-gray-500 my-1 text-sm">500 posts</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
