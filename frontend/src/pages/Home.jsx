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
import { Link } from "react-router-dom";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";


function Home() {
  const { loading, error, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct({ keyword: "" }));//{ keyword: "" }
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
          <PageTitle title="Home | SwiftCart" />
          <Navbar />
          <ImageSlider />
          <section className="mt-12 bg-linear-to-b from-orange-50 via-rose-50 to-white py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center">
                <span className="inline-flex animate-pulse items-center gap-1 rounded-full bg-linear-to-r from-orange-500 to-rose-600 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-md">
                  <LocalFireDepartmentIcon fontSize="small" />
                  Hot right now
                </span>
                <h2 className="mt-4 bg-linear-to-r from-orange-500 to-rose-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                  Trending Now
                </h2>
                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-linear-to-r from-orange-500 to-rose-600" />
                <p className="mt-4 text-slate-600">The most-loved picks, flying off our shelves</p>
              </div>

              <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <div key={product._id} className="transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-200">
                    <Product product={product} />
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link to="/products" className="inline-block rounded-full bg-linear-to-r from-orange-500 to-rose-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
                  View all products →
                </Link>
              </div>
            </div>
          </section>
          <Footer />
        </>)
      }
    </>
  );
}

export default Home;
