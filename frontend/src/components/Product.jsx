import { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <Link
            to={`/product/${product._id}`}
            className="text-inherit no-underline"
        >
            <div className="my-4 flex w-[250px] flex-col rounded-[10px] text-center text-slate-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">

                <img
                    src={product.image[0].url}
                    alt={product.name}
                    className="max-h-[200px] h-full w-full rounded-t-[8px] object-contain"
                />

                <div className="p-4">

                    <h3 className="mb-2 text-[1.2rem] font-bold text-slate-900">
                        {product.name}
                    </h3>

                    <p className="mb-4 text-base font-bold text-indigo-600">
                        <strong>Price</strong> {product.price}/-
                    </p>

                    <div className="flex items-center justify-center">
                        <Rating
                            value={product.ratings}
                            onRatingChange={handleRatingChange}
                            disabled={true}
                        />
                    </div>

                    <span className="ml-2 text-sm text-slate-500">
                        ( {product.numOfReviews} {product.numOfReviews === 1 ? "Review" : "Reviews"} )
                    </span>

                    <button className="mx-auto mt-2 block cursor-pointer rounded bg-indigo-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-indigo-700">
                        View Details
                    </button>

                </div>
            </div>
        </Link>
    );
}

export default Product;