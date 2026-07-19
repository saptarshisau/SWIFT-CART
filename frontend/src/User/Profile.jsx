import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageTitle from '../components/PageTitle'
import Loader from '../components/Loader'

function Profile() {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
            //after logout it should be redirected to login page --> ProtectedRoute handles this, but we can also handle it here, by checking if the user is authenticated or not and redirect him to the login page
            //Actually you don't even need the useEffect func here lol, no use
        }
    }, [isAuthenticated, navigate])
    return (
        <>
            {/* we say that crash coz the navigate in UserDashboard is async, and here this PageTitle tries to rerender first but  user.name is null, and talking about the userEffect it only runs when the component mounts, so no use*/}
            {loading ? (<Loader />) : (<div className="max-w-[800px] my-[1.5rem] md:my-[3rem] mx-[1.5rem] md:mx-auto p-[1.5rem] md:p-[2rem] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <PageTitle title={`${user.name} Profile`} />
                <div className="text-center bg-gradient-to-br from-[#f6f8ff] to-[#ffffff] rounded-[15px] mb-[2.5rem] pb-8">
                    <h1 className="inline-block text-[2rem] md:text-[2.5rem] text-[var(--bg-secondary)] mt-[2rem] mb-[1rem] font-semibold tracking-[-0.5px]">My Profile</h1>
                    <img src={user.avatar.url ? user.avatar.url : './images/profile.png'} alt="User Profile" className="w-[180px] h-[180px] rounded-full object-cover border-[4px] border-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] mx-auto mt-[1rem] mb-[2rem] block transition-transform duration-300 ease-in-out hover:scale-[1.05]" />
                    <Link to="/profile/update" className="inline-block py-[0.75rem] px-[2rem] bg-[var(--border-color)] text-white rounded-[30px] no-underline font-medium transition-all duration-300 ease-in-out shadow-[0_4px_12px_var(--bg-secondary)] hover:bg-[var(--primary-dark)] hover:-translate-y-[2px]">Edit Profile</Link>
                </div>
                <div className="p-[1.5rem] bg-[#f8fafc] rounded-[15px] my-[2rem]">
                    <div className="flex flex-col items-start text-left md:flex-row md:items-center p-[1.25rem] mb-[1rem] bg-white rounded-[12px] transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:translate-x-[5px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <h2 className="text-[1.1rem] text-[#64748b] min-w-[130px] m-0 mb-[0.5rem] md:mb-0 font-medium">Username:</h2>
                        <p className="text-[1.1rem] text-[var(--bg-primary)] m-0 pl-0 md:pl-[1rem] font-medium">{user.name}</p>
                    </div>
                    <div className="flex flex-col items-start text-left md:flex-row md:items-center p-[1.25rem] mb-[1rem] bg-white rounded-[12px] transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:translate-x-[5px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <h2 className="text-[1.1rem] text-[#64748b] min-w-[130px] m-0 mb-[0.5rem] md:mb-0 font-medium">Email:</h2>
                        <p className="text-[1.1rem] text-[var(--bg-primary)] m-0 pl-0 md:pl-[1rem] font-medium">{user.email}</p>
                    </div>
                    <div className="flex flex-col items-start text-left md:flex-row md:items-center p-[1.25rem] mb-[1rem] bg-white rounded-[12px] transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:translate-x-[5px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                        <h2 className="text-[1.1rem] text-[#64748b] min-w-[130px] m-0 mb-[0.5rem] md:mb-0 font-medium">Joined On:</h2>
                        <p className="text-[1.1rem] text-[var(--bg-primary)] m-0 pl-0 md:pl-[1rem] font-medium">{user.createdAt ? String(user.createdAt).substring(0, 10) : 'N/A'}</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-[1rem] justify-center items-center mt-[2.5rem]">
                    <Link to="/orders/user" className="w-[80%] md:w-auto text-center py-[0.875rem] px-[2rem] bg-[var(--border-color)] text-white no-underline rounded-[10px] transition-all duration-300 ease-in-out font-medium shadow-[0_4px_12px_var(--bg-secondary)] hover:bg-[var(--bg-secondary)] hover:-translate-y-[2px]">My Orders</Link>
                    <Link to="/password/update" className="w-[80%] md:w-auto text-center py-[0.875rem] px-[2rem] bg-[var(--border-color)] text-white no-underline rounded-[10px] transition-all duration-300 ease-in-out font-medium shadow-[0_4px_12px_var(--bg-secondary)] hover:bg-[var(--bg-secondary)] hover:-translate-y-[2px]">Change Password</Link>
                </div>
            </div>)}</>

    )

}

export default Profile
