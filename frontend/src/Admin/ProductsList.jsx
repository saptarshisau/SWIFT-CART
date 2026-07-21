import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchAdminProducts, removeErrors, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function ProductsList() {
    const { products, loading, error, deleting } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAdminProducts())
    }, [dispatch])
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 })
            dispatch(removeErrors());
        }
    }, [dispatch, error])
    const handleDelete = (productId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this product?')
        if (isConfirmed) {
            dispatch(deleteProduct(productId)).then((action) => {
                if (action.type === 'admin/deleteProduct/fulfilled') {
                    toast.success("Product Deleted Successfully", { position: 'top-center', autoClose: 3000 })
                    dispatch(removeSuccess());
                }
            })
        }

    }

    if (!products || products.length === 0) {
        return (
            <div className="p-5 bg-gray-50/50 rounded-2xl shadow-md min-h-screen mt-[90px] max-w-[1200px] mx-auto">
                <h1 className="text-2xl md:text-3xl mb-8 text-[#3B3B4F] font-bold">Admin Products</h1>
                <p className="text-center p-8 bg-gray-600 text-white rounded-lg text-lg font-medium">No Products Found</p>
            </div>
        )
    }
    console.log(products);
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="All Products" />
                <div className="p-5 bg-gray-50/50 rounded-2xl shadow-md min-h-screen mt-[90px] max-w-[1200px] mx-auto mb-10">
                    <h1 className="text-2xl md:text-3xl mb-8 text-[#3B3B4F] font-bold">All Products</h1>

                    <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Sl No</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Product Image</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Product Name</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Price</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Ratings</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Category</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Stock</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Created At</th>
                                        <th className="p-4 bg-[#4E4A59] text-white font-semibold whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={product._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{index + 1}</td>
                                            <td className="p-4 border-b border-gray-100 whitespace-nowrap">
                                                <img src={product.image[0].url.replace('./', '/')} alt={product.name} className='w-[70px] h-[70px] object-cover rounded-md shadow-sm' />
                                            </td>
                                            <td className="p-4 border-b border-gray-100 text-gray-800 font-medium whitespace-nowrap">{product.name}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-800 font-bold whitespace-nowrap">{product.price}/-</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{product.ratings}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{product.category}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-700 whitespace-nowrap">{product.stock}</td>
                                            <td className="p-4 border-b border-gray-100 text-gray-600 whitespace-nowrap">{new Date(product.createdAt).toLocaleString()}</td>
                                            <td className="p-4 border-b border-gray-100 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/admin/product/${product._id}`} className='inline-flex items-center justify-center p-2 rounded-lg text-[#6C5B7B] hover:bg-[#6C5B7B]/10 transition-colors duration-200'><Edit fontSize="small" /></Link>
                                                    <button className="inline-flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors duration-200" disabled={deleting[product._id]} onClick={() => handleDelete(product._id)}>
                                                        {deleting[product._id] ? <div className="scale-50"><Loader /></div> : <Delete fontSize="small" />}
                                                    </button>
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

export default ProductsList
