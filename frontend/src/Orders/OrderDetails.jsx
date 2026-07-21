import { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, removeErrors } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function OrderDetails() {
  const { orderId } = useParams();
  const { order, loading, error } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error, orderId]);
  const {
    shippingInfo = {},
    orderItems = [],
    paymentInfo = {},
    orderStatus,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemPrice,
    paidAt
  } = order;
  const paymentStatus = paymentInfo?.status === 'succeeded' ? 'Paid' : 'Not Paid'
  const finalOrderStatus = paymentStatus === 'Not Paid' ? 'Cancelled' : orderStatus;
  return (
    <>
      <PageTitle title={orderId} />
      <Navbar />
      {loading ? (<Loader />) : (
        <div className="max-w-[1000px] mx-auto mt-24 mb-20 px-5 md:px-10 py-8 md:py-10 bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[70vh]">
          <h1 className="text-center text-[#3B3B4F] text-3xl md:text-4xl font-bold mb-10 drop-shadow-sm">Order Details</h1>

          <div className="flex flex-col gap-10">
            {/* Order Items table */}
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold p-5 text-[#4E4A59] border-b border-gray-200 bg-gray-50/80">Order Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Image</th>
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Name</th>
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Quantity</th>
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-200 text-sm md:text-base whitespace-nowrap">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="p-4 md:p-5 border-b border-gray-100">
                          <img src={item.image.replace('./', '/')} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-lg shadow-sm" />
                        </td>
                        <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.name}</td>
                        <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.quantity}</td>
                        <td className="p-4 md:p-5 text-gray-700 font-bold border-b border-gray-100 text-sm md:text-base whitespace-nowrap">{item.price}/-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping Info Table */}
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold p-5 text-[#4E4A59] border-b border-gray-200 bg-gray-50/80">Shipping Info</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Address</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">
                        {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.pinCode}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Phone</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{shippingInfo.phoneNo}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <h2 className="text-lg md:text-xl font-bold p-5 text-[#4E4A59] border-b border-gray-200 bg-gray-50/80">Order Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Order Status</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">
                        <span className={`px-3 py-1 rounded-md font-bold text-xs md:text-sm inline-block ${finalOrderStatus === 'Processing' ? 'text-orange-600 bg-orange-100' : finalOrderStatus === 'Delivered' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                          {finalOrderStatus}
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Payment</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">
                        <span className={`px-3 py-1 rounded-md font-bold text-xs md:text-sm inline-block ${paymentStatus === 'Paid' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                          {paymentStatus}
                        </span>
                      </td>
                    </tr>
                    {paidAt && (
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Paid At</th>
                        <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{new Date(paidAt).toLocaleString()}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Items Price</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{itemPrice}/-</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Tax Price</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{taxPrice}/-</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-gray-700 border-b border-gray-100 text-sm md:text-base whitespace-nowrap w-1/3">Shipping Price</th>
                      <td className="p-4 md:p-5 text-gray-700 font-medium border-b border-gray-100 text-sm md:text-base">{shippingPrice}/-</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <th className="p-4 md:p-5 bg-[#F8F8F8] font-semibold text-[#3B3B4F] border-b border-gray-100 text-base md:text-lg whitespace-nowrap w-1/3">Total Price</th>
                      <td className="p-4 md:p-5 text-[#3B3B4F] font-bold border-b border-gray-100 text-base md:text-lg">{totalPrice}/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default OrderDetails;
