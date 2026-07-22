import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, removeErrors, removeSuccess, updateUserRole } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UpdateRole() {
  const { userId } = useParams();
  const { user, success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  useEffect(() => {
    dispatch(getSingleUser(userId))
  }, [dispatch])
  const { name, email, role } = formData;
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserRole({ userId, role }))
  }
  useEffect(() => {
    if (success) {
      toast.success("User Role Updated Successfully", { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess())
      navigate('/admin/users')
    }
    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error, success])
  return (
    <>
      {loading ? (<Loader />) : (<>
        <Navbar />
        <PageTitle title="Update User Role" />
        <div className="flex flex-col justify-center items-center min-h-[80vh] w-full pt-10 pb-16 px-4">
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-[500px]">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3B3B4F] mb-8">Update User Role</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-gray-700">Name</label>
                <input type="text" id="name" name="name" readOnly value={name} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  value={email}
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="font-semibold text-gray-700">Role</label>
                <select name="role" id="role" required value={role} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow">
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="w-full py-3 mt-4 bg-[#6C5B7B] hover:bg-[#4E4A59] text-white font-bold rounded-lg transition-colors duration-300 shadow-md">Update Role</button>
            </form>
          </div>
        </div>

        <Footer />
      </>)}
    </>
  );
}

export default UpdateRole;
