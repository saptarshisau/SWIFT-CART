import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify'
import { saveShippingInfo } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Shipping() {
  const { shippingInfo } = useSelector(state => state.cart)

  const dispatch = useDispatch()
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  /*The real advantages of a <form> are browser behavior, semantics, accessibility, and convenience, not data storage. The signify, the data belongs together*/
  const navigate = useNavigate()
  const shippingInfoSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast.error('Invalid Phone number ! It should be 10 digits', { position: 'top-center', autoClose: 3000 })
      return;
    }
    dispatch(saveShippingInfo({ address, pinCode, phoneNumber, country, state, city }))
    navigate('/order/confirm')
  }

  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activePath={0} />
      <div className="max-w-[1000px] mx-auto my-10 px-5 mb-20">
        <h1 className="text-[#3B3B4F] text-[28px] font-bold mb-8 text-center drop-shadow-sm">Shipping Details</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100" onSubmit={shippingInfoSubmit}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-[#4E4A59] text-[15px] font-semibold">Address</label>
              {/* htmlFor coz clicking on the label activates the field */}
              <input type="text" id="address" name="address" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="pinCode" className="text-[#4E4A59] text-[15px] font-semibold">PinCode</label>
              <input type="number" id="pinCode" name="pinCode" placeholder="Enter your pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-[#4E4A59] text-[15px] font-semibold">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-[#4E4A59] text-[15px] font-semibold">Country</label>
              <select name="country" id="country" value={country} onChange={(e) => {
                setCountry(e.target.value)
                setState("");
                setCity("")
              }} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400 cursor-pointer">
                <option value="">Select a Country</option>
                {Country && Country.getAllCountries().map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                ))}
              </select>
            </div>

            {country && <div className="flex flex-col gap-2 animate-[fadeIn_0.3s_ease-in-out]">
              <label htmlFor="state" className="text-[#4E4A59] text-[15px] font-semibold">State</label>
              <select name="state" id="state" value={state} onChange={(e) => {
                setState(e.target.value)
                setCity("")
              }
              } className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400 cursor-pointer">
                <option value="">Select a State</option>
                {State && State.getStatesOfCountry(country).map((item) => (
                  <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                ))}
              </select>
            </div>}

            {state && <div className="flex flex-col gap-2 animate-[fadeIn_0.3s_ease-in-out]">
              <label htmlFor="city" className="text-[#4E4A59] text-[15px] font-semibold">City</label>
              <select name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50/50 text-[#3B3B4F] text-[15px] transition-all duration-300 focus:outline-none focus:border-[#6C5B7B] focus:ring-4 focus:ring-[#6C5B7B]/10 focus:bg-white placeholder-gray-400 cursor-pointer">
                <option value="">Select a City</option>
                {City && City.getCitiesOfState(country, state).map((item) => (
                  <option value={item.name} key={item.name}>{item.name}</option>
                ))}
              </select>
            </div>}
          </div>
          <button className="col-span-1 md:col-span-2 p-4 bg-[#6C5B7B] text-[#EAE7E0] border-none rounded-xl text-lg font-bold cursor-pointer transition-all duration-300 hover:bg-[#4E4A59] mt-6 shadow-md hover:shadow-xl hover:-translate-y-1">Continue</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Shipping;
