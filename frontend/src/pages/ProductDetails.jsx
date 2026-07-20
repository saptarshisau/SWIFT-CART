import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';

function ProductDetails() {
    const [userRating, setUserRating] = useState(0);
    const [comment, setComment] = useState("")
    const [quantity, setQuantity] = useState(1);
    // const [selectedImage, setSelectedImage] = useState("");
    const handleRatingChange = (newRating) => {
        setUserRating(newRating)
    }
    const { loading, error, product, reviewSuccess, reviewLoading } = useSelector((state) => state.product);

    const { loading: cartLoading, error: cartError, success, message } = useSelector((state) => state.cart);


    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(getProductDetails(id));
        }
        return () => {
            dispatch(removeErrors())
        }
    }, [dispatch, id])

    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (cartError) {
            toast.error(cartError, { position: 'top-center', autoClose: 3000 });
        }
    }, [dispatch, error, cartError])

    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeMessage())
        }
    }, [dispatch, success, message])

    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity cannot be less than 1', { position: 'top-center', autoClose: 3000 })
            dispatch(removeErrors())
            return;
        }
        setQuantity(qty => qty - 1)
    }
    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            toast.error('Cannot exceed available Stock!', { position: 'top-center', autoClose: 3000 })
            dispatch(removeErrors())
            return;
        }
        setQuantity(qty => qty + 1)
    }

    const addToCart = () => {
        dispatch(addItemsToCart({ id, quantity }))
    }

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!userRating) {
            toast.error('Please Select a rating', { position: 'top-center', autoClose: 3000 });
            return
        }
        dispatch(createReview({
            rating: userRating,
            comment,
            productId: id
        }))
    }
    useEffect(() => {
        if (reviewSuccess) {
            toast.success('Review Submitted Successfully', { position: 'top-center', autoClose: 3000 });
            setUserRating(0);
            setComment("");
            dispatch(removeSuccess())
            dispatch(getProductDetails(id))
        }
    }, [reviewSuccess, id, dispatch])
    // useEffect(() => {
    //     if (product && product.image && product.image.length > 0) {
    //         setSelectedImage(product.image[0].url)
    //     }
    // }, [product])
    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />
            </>
        )
    }
    if (error || !product) {
        return (
            <>
                <PageTitle title="Product Details" />
                <Navbar />
                <Footer />
            </>
            // i was trying to display the page with no product image, i used optional chaining
        )
    }
    return (
        <>
            <PageTitle title={`${product.name} - Details`} />
            <Navbar />
            <div className="p-[100px] max-[568px]:w-[80%] max-[568px]:mx-auto max-[568px]:p-5">
                <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-around items-center">
                    <div className="static md:sticky top-[40px] z-10 mb-5 w-full md:w-[500px]">
                        <img src={product.image[0].url.replace('./', '/')} alt={product.name} className="w-full max-h-[500px] object-contain rounded-lg bg-white" />
                        {/* {product.image.length > 1 && (<div className="mt-5">
                            {product.image.map((img, index) => (
                                <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-[80px] h-[80px] object-cover cursor-pointer ml-[10px] transition-transform duration-300 hover:scale-110" onClick={() => setSelectedImage(img.url)} />
                            ))}
                        </div>)} */}
                    </div>

                    <div className="p-5 w-full md:w-[500px]">
                        <h2 className="text-[24px] mb-[15px] text-[#0F1111]">{product.name}</h2>
                        <p className="text-left">{product.description}</p>
                        <p className="text-left">Price :  {product.price}/-</p>

                        <div className="flex items-center justify-start gap-2">
                            <Rating
                                value={product.ratings}
                                disabled={true}
                            />
                            <span className="ml-0">  ( {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"} )</span>
                        </div>

                        <div className="my-2.5 text-[16px]">
                            <span className={product.stock > 0 ? `text-[#007600]` : 'text-[#B12704]'}>
                                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                            </span>
                        </div>

                        {product.stock > 0 && (<>  <div className="flex items-center my-5 gap-2.5">
                            <span className="font-medium mr-2.5">Quantity:</span>
                            <button className="w-[35px] h-[35px] border border-[#D5D9D9] bg-gradient-to-b from-[#F7F8FA] to-[#E7E9EC] cursor-pointer text-[18px] rounded" onClick={decreaseQuantity}>-</button>
                            <input type="text" value={quantity} className="w-[50px] h-[35px] text-center border border-[#D5D9D9] mx-[5px] text-[16px]" readOnly />
                            <button className="w-[35px] h-[35px] border border-[#D5D9D9] bg-gradient-to-b from-[#F7F8FA] to-[#E7E9EC] cursor-pointer text-[18px] rounded" onClick={increaseQuantity}>+</button>
                        </div>
                            <button className="w-full px-5 py-3 bg-[#5C4A6F] border border-[#2E2E3C] rounded-lg text-[16px] cursor-pointer my-5 text-[#EAE7E0] hover:bg-[#3B3B4F]" onClick={addToCart} disabled={cartLoading}>{cartLoading ? 'Adding' : 'Add to Cart'}</button>
                        </>)}

                        <form className="bg-[#F8F8F8] p-5 rounded-lg mb-[30px]" onSubmit={handleReviewSubmit}>
                            <h3 className="mb-2">Write a Review</h3>
                            <Rating
                                value={0}
                                disabled={false}
                                onRatingChange={handleRatingChange}
                            />
                            <textarea placeholder="Write your review here.." className="w-full min-h-[100px] p-[10px] border border-[#D5D9D9] rounded my-[10px] resize-y" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                            <button className="bg-[#2E2E3C] text-white px-5 py-2.5 border-none rounded cursor-pointer hover:bg-[#374759]" disabled={reviewLoading}>{reviewLoading ? 'Submitting....' : 'Submit Review'}</button>
                        </form>
                    </div>
                </div>

                <div className="col-span-full mt-10 pt-5 border-t border-[#E7E7E7]">
                    <h3 className="mb-4">Customer Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (<div className="mt-[30px]">
                        {product.reviews.map((review, index) => (
                            <div className="py-5 border-b border-[#E7E7E7]" key={index}>
                                <div className="mb-2">
                                    <Rating value={review.rating} disabled={true} />
                                </div>
                                <p className="my-2.5 text-[#333] text-left">{review.comment}</p>
                                <p className="my-2.5 text-[#333] text-left font-semibold">By : {review.name}</p>
                            </div>
                        ))}
                    </div>) : (
                        <p className="my-2.5 text-[#333] text-left">No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetails
