import "../pageStyles/Home.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Product from "../components/Product";
import ImageSlider from "../components/ImageSlider";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { getProduct, removeErrors } from "../features/products/productSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";


function Home() {
  const { loading, error, products, productCount } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());//{ keyword: "" }
    //after searching we need to fetch the data again, otherelse it was only showing the searched products on Home page again 
  }, [dispatch])
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 })
      dispatch(removeErrors());
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
        </>)
      }
    </>
  );
}

export default Home;
