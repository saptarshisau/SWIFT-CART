import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../features/admin/adminSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function UsersList() {
    const { users, loading, error, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const handleDelete = (userId) => {
        const confirm = window.confirm('Are you sure you want to delete this user?')
        if (confirm) {
            dispatch(deleteUser(userId))
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (message) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(clearMessage())
            navigate('/admin/dashboard')
        }
    }, [dispatch, error, message])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="All Users" />
                <div className="p-5 bg-gray-50/50 rounded-2xl shadow-md min-h-[70vh] mt-[90px] max-w-[1200px] mx-auto mb-10">
                    <h1 className="text-2xl md:text-3xl mb-8 text-[#3B3B4F] font-bold">All Users</h1>
                    
                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Sl No</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Name</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Email</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Role</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Created At</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{index + 1}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-800 font-medium whitespace-nowrap">{user.name}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{user.email}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-700 font-medium whitespace-nowrap">{user.role}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-600 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 border-b border-gray-100 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/admin/user/${user._id}`} className='inline-flex items-center justify-center p-2 rounded-lg text-[#6C5B7B] hover:bg-[#6C5B7B]/10 transition-colors duration-200'><Edit fontSize="small" /></Link>
                                                    <button className="inline-flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600 bg-transparent transition-colors duration-200" onClick={() => handleDelete(user._id)}><Delete fontSize="small" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Footer />

            </>)}
        </>
    )
}

export default UsersList
