import "../pageStyles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import ImageSlider from "../components/ImageSlider";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { getProduct } from "../features/products/productSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";


function Home() {
  const { loading, error, products, productCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));
    //after searching we need to fetch the data again, otherelse it was only showing the searched products on Home page again 
  }, [dispatch])
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 })
      dispatch(reportError());
    }
  }, [dispatch, error])
  return (
    <>
      {loading ?
        (<Loader />)
        : (<>
          <PageTitle title="Home-My Website" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading">Trending Now</h2>
            <div className="home-product-container">
              {products.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          </div>
          <Footer />
        </>)}
    </>
  );
}

export default Home;
