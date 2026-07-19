import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import '../componentStyles/Navbar.css';
import '../pageStyles/Search.css'
import { useSelector } from 'react-redux';


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    // const { isAuthenticated } = useSelector(state => state.user)
    // const { cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate();
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
        } else {
            navigate(`/products`)
        }
        setSearchQuery("")
        //input field value cleared after coming back from the redirected page
    }
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <div className="text-2xl font-bold text-indigo-600 transition-colors duration-200 hover:text-indigo-700">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        SwiftCart
                    </Link>
                </div>

                <div
                    className={`absolute left-0 top-16 w-full border-t border-slate-200 bg-white shadow-lg transition-all duration-300 md:static md:w-auto md:border-none md:bg-transparent md:shadow-none ${isMenuOpen ? "block" : "hidden"
                        } md:block`}
                >
                    <ul className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-10 md:p-0">
                        <li onClick={() => setIsMenuOpen(false)}>
                            <Link
                                to="/"
                                className="font-medium text-slate-700 transition-colors hover:text-indigo-600"
                            >
                                Home
                            </Link>
                        </li>

                        <li onClick={() => setIsMenuOpen(false)}>
                            <Link
                                to="/products"
                                className="font-medium text-slate-700 transition-colors hover:text-indigo-600"
                            >
                                Products
                            </Link>
                        </li>

                        <li onClick={() => setIsMenuOpen(false)}>
                            <Link
                                to="/about-us"
                                className="font-medium text-slate-700 transition-colors hover:text-indigo-600"
                            >
                                About Us
                            </Link>
                        </li>

                        <li onClick={() => setIsMenuOpen(false)}>
                            <Link
                                to="/contact-us"
                                className="font-medium text-slate-700 transition-colors hover:text-indigo-600"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex w-auto items-center gap-5 md:w-64">

                    <div className="relative">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Search products.."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`rounded-md border border-slate-300 px-2 py-1 outline-none transition-all duration-300
                ${isSearchOpen
                                        ? "w-28 opacity-100 mr-2"
                                        : "w-0 opacity-0 p-0 border-0"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={toggleSearch}
                                className="flex items-center justify-center p-1 focus:outline-none"
                            >
                                <SearchIcon
                                    focusable="false"
                                    className="text-slate-700 hover:text-indigo-600"
                                />
                            </button>
                        </form>
                    </div>

                    {/* <div className="cart-container">
                <Link to="/cart">
                    <ShoppingCartIcon className="cursor-pointer text-slate-700 transition-colors hover:text-indigo-600" />
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
                        {cartItems.length}
                    </span>
                </Link>
            </div> */}

                    {/* {!isAuthenticated && (
                <Link to="/register">
                    <PersonAddIcon className="cursor-pointer text-slate-700 transition-colors hover:text-indigo-600" />
                </Link>
            )} */}

                    <button
                        onClick={toggleMenu}
                        className="ml-auto rounded-md p-1 text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600 md:hidden"
                    >
                        {isMenuOpen ? (
                            <CloseIcon className="h-7 w-7" />
                        ) : (
                            <MenuIcon className="h-7 w-7" />
                        )}
                    </button>

                </div>
            </div>
        </nav>
    )
}

export default Navbar
