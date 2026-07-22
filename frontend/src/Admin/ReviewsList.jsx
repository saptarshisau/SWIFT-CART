import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, deleteReview, fetchAdminProducts, fetchProductReviews, removeErrors, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
function ReviewsList() {
  const { products, loading, error, reviews, success, message } = useSelector(state => state.admin);
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminProducts())
  }, [dispatch])


  const handleViewReviews = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReviews(productId))
  }
  const handleDeleteReview = (productId, reviewId) => {
    const confirm = window.confirm('Are you sure you want to delete this review?');
    if (confirm) {
      dispatch(deleteReview({ productId, reviewId }))
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
    if (success) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess())
      dispatch(clearMessage())
      navigate("/admin/products")
    }
  }, [dispatch, error, success, message])
  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto my-5 p-4 md:my-10 md:p-5 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-5 text-gray-800">Admin Reviews</h1>
        <p className="text-gray-600 text-center">No Product Found</p>
      </div>
    )
  }
  return (
    <>
      {loading ? (<Loader />) : (<>
        <Navbar />
        <PageTitle title="All Reviews" />
        <div className="max-w-7xl mx-auto my-5 p-4 md:my-10 md:p-5 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-5 text-gray-800">All Products</h1>
          <table className="w-full border-collapse mt-5">
            <thead>
              <tr>
                <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Sl No</th>
                <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Product Name</th>
                <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Product Image</th>
                <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Number of Reviews</th>
                <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{index + 1}</td>
                  <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{product.name}</td>
                  <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">
                    <img src={product.image[0].url.replace('./', '/')} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                  </td>
                  <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{product.numOfReviews}</td>
                  <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">
                    {product.numOfReviews > 0 && (<button className="py-2 px-4 text-sm font-semibold rounded-md cursor-pointer transition-all duration-300 ease-in-out bg-slate-800 text-white hover:bg-slate-700" onClick={() => handleViewReviews(product._id)}>View Reviews</button>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedProduct && reviews && reviews.length > 0 && (<div className="mt-10">
            <h2 className="text-3xl font-semibold mb-5 text-gray-800">Reviews for Product</h2>
            <table className="w-full border-collapse mt-5">
              <thead>
                <tr>
                  <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Sl No</th>
                  <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Reviewer Name</th>
                  <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Rating</th>
                  <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Comment</th>
                  <th className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-slate-800 text-white font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review._id} className="hover:bg-gray-100">
                    <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{index + 1}</td>
                    <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{review.name}</td>
                    <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{review.rating}</td>
                    <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">{review.comment}</td>
                    <td className="py-2.5 px-2.5 md:py-3 md:px-4 text-left border-b border-gray-100 text-sm md:text-base bg-gray-50">
                      <button className="py-2 px-4 text-sm font-semibold rounded-md cursor-pointer transition-all duration-300 ease-in-out text-red-500 hover:text-red-700 bg-transparent hover:bg-red-50" onClick={() => handleDeleteReview(selectedProduct, review._id)}><Delete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
        </div>
        <Footer />
      </>)}
    </>
  );
}

export default ReviewsList;
