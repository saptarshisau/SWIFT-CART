import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'
function ProtectedRoute({ element, adminOnly = false }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.user);
    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" />
    }
    return element
}

export default ProtectedRoute
/*
On user dashboard i have added a dashboard button which shows options like profile, orders etc, now when i am in the profile page and i click on the dashboard button i am redirected to the dashboard page but when i click on logout from the dashboard popdown i was redirected to a blank page, although i had navigate to /login in the UserDashboard file, why is that? Why is that protectedRoute solving it?
*/
