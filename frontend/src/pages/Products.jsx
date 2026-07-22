import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import NoProducts from '../components/NoProducts';
import Pagination from '../components/Pagination';

function Products() {
  const { loading, error, products } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const location = useLocation(); //router-dom
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword")
  const pageFromURL = parseInt(searchParams.get("page"), 10) || 1
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const navigate = useNavigate();

  const category = searchParams.get("category")
  const categories = ["laptop", "mobile", "tv", "fruits", "pant"];

  useEffect(() => {
    dispatch(getProduct({ keyword, page: currentPage, category }))
  }, [dispatch, keyword, currentPage, category])

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error])

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search);

      if (page === 1) {
        newSearchParams.delete('page')
      } else {
        newSearchParams.set('page', page)
      }

      navigate(`?${newSearchParams.toString()}`)
    }
  }

  const handleCategoryClick = (category) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('category', category)
    newSearchParams.delete('page')
    //deletes
    navigate(`?${newSearchParams.toString()}`)
  }

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <PageTitle title="All Products" />
            <Navbar />

            <div className="mt-24 flex flex-col gap-5 p-5 md:flex-row md:items-start">

              <div className="w-full rounded-lg bg-white p-5 shadow-md md:w-[250px] md:flex-shrink-0">

                <h3 className="mb-3 text-lg font-semibold text-indigo-700">
                  CATEGORIES
                </h3>

                {/* Render Categories */}

                <ul className="m-0 list-none p-0">
                  {
                    categories.map((category) => {
                      return (
                        <li
                          key={category}
                          onClick={() => handleCategoryClick(category)}
                          className="my-2 cursor-pointer rounded-md px-2 py-2 text-base uppercase text-slate-600 transition-colors duration-300 hover:bg-slate-100"
                        >
                          {category}
                        </li>
                      )
                    })
                  }
                </ul>

              </div>

              <div className="flex flex-1 flex-col gap-4">

                {
                  products.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-6">
                      {
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                          />
                        ))
                      }
                    </div>
                  ) : (
                    <NoProducts keyword={keyword} />
                  )
                }

                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />

              </div>

            </div>

            <Footer />
          </>
        )
      }
    </>
  )
}

export default Products

/*
1. useLocation()
useLocation() is a hook from react-router-dom that gives you information about the current URL. Suppose your browser is currently at
http://localhost:5173/products?keyword=iphone&page=2
Then const location = useLocation();
returns an object similar to
{
    pathname: "/products",
    search: "?keyword=iphone&page=2",
    hash: "",
    state: null,
    key: "abc123"
}

The important properties are:
pathname → the path
"/products"
search → everything after the ?
"?keyword=iphone&page=2"
hash → everything after #
"#section1"
(if present)

2. What is location.search?
From the above object, location.search is simply "?keyword=iphone&page=2"
Notice it's just a string.
You can't do location.search.keyword because it's not an object.
It's literally "?keyword=iphone&page=2"

3. Why URLSearchParams?
Since location.search is just a string, JavaScript provides a helper class called URLSearchParams.
const searchParams = new URLSearchParams(location.search);
takes
"?keyword=iphone&page=2" and parses it into something you can query easily.
Think of it like converting
"?keyword=iphone&page=2" into

{
    keyword: "iphone",
    page: "2"
}
It's not actually a plain object, but you can access values similarly.
location.search is simply "?keyword=iphone&page=2". Notice it's just a string. You can't do location.search.keyword because it's not an object.
It's literally "?keyword=iphone&page=2"
*/