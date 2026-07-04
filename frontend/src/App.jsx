import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Register from './User/Register'
import Login from './User/Login'
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './features/user/userSlice';
import { useEffect } from 'react';
import UserDashboard from './User/UserDashboard'
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  }, [dispatch])
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        {isAuthenticated && <UserDashboard user={user} />}
      </Router>
    </>
  )
}

export default App
