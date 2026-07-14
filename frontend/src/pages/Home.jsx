import "../pageStyles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import ImageSlider from "../components/ImageSlider";
import PageTitle from "../components/PageTitle";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../components/Loader";
// import { getProduct } from "../features/products/productSlice";
// import { useEffect } from "react";
// import { toast } from "react-toastify";


function Home() {
  // const { loading, error, products, productCount } = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getProduct({ keyword: "" }));
  //   //after searching we need to fetch the data again, otherelse it was only showing the searched products on Home page again 
  // }, [dispatch])
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error.message, { position: 'top-center', autoClose: 3000 })
  //     dispatch(reportError());
  //   }
  // }, [dispatch, error])
  let products = [
    {
      "_id": "6a31caa7742b8313b523838f",
      "name": "Product1",
      "description": "Product description1",
      "price": 100,
      "ratings": 2.5,
      "image": [
        {
          "public_id": "This is Test id1",
          "url": "This is test url1",
          "_id": "6a31caa7742b8313b5238390"
        }
      ],
      "category": "shirt",
      "stock": 100,
      "numOfReviews": 2,
      "reviews": [
        {
          "user": "6a356616d36a9e1aff3ed6f2",
          "name": "Rishi2",
          "rating": 1,
          "comment": "Very bad",
          "_id": "6a35682c5e2589ed4dbdb576"
        },
        {
          "user": "6a356621d36a9e1aff3ed6f3",
          "name": "Rishi3",
          "rating": 4,
          "comment": "SATISFIED",
          "_id": "6a3568d95e2589ed4dbdb579"
        }
      ],
      "createdAt": "2026-06-16T22:13:59.064Z",
      "__v": 2
    }]
  return (
    <>
      {/* {loading ?
        (<Loader />)
        : (<> */}
      <PageTitle title="Home-My Website" />
      <Navbar />
      <ImageSlider />
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-4xl font-bold tracking-tight text-slate-800">
          Trending Now
        </h2>

        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
      <Footer />
      {/* </>) */}
    </>
  );
}

export default Home;
