import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addItemsToCart,
  removeErrors,
  removeItemFromCart,
  removeMessage,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function CartItem({ item }) {
  const { success, loading, error, message } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty - 1);
  };
  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("Cannot exceed available Stock!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
      return;
    }
    setQuantity((qty) => qty + 1);
  };

  const handleUpdate = () => {
    if (loading) return;
    if (quantity !== item.quantity) {
      dispatch(addItemsToCart({ id: item.product, quantity }));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);
  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "cart-update", //toast was showing twice so added this
      });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  const handleRemove = () => {
    if (loading) return;
    dispatch(removeItemFromCart(item.product))
    toast.success("Item removed from cart successfully", {
      position: "top-center",
      autoClose: 3000
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.8fr] gap-4 md:gap-4 items-center p-4 md:p-6 bg-white md:bg-transparent rounded-xl md:rounded-none shadow-sm md:shadow-none border-b-0 md:border-b border-gray-100 mb-4 md:mb-0 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex flex-row gap-4 md:gap-6 items-center">
        <img src={item.image} alt={item.name} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover rounded-xl shadow-sm" />
        <div className="flex flex-col gap-1 md:gap-2">
          <h3 className="text-base md:text-lg font-bold text-gray-800 m-0">{item.name}</h3>
          <p className="text-sm md:text-base text-gray-500 m-0">
            <strong>Price: </strong>
            {item.price.toFixed(2)}/-
          </p>
          <p className="text-sm md:text-base text-gray-500 m-0">
            <strong>Quantity : </strong>
            {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg md:rounded-none w-fit">
        <button
          className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-bold text-gray-600 hover:text-[#5C4A6F] hover:border-[#5C4A6F] transition-colors cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={decreaseQuantity}
          disabled={loading}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          className="w-12 md:w-14 h-8 md:h-10 text-center border border-gray-200 rounded-lg font-semibold text-gray-800 bg-white"
          readOnly
          min="1"
        />
        <button
          className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center font-bold text-gray-600 hover:text-[#5C4A6F] hover:border-[#5C4A6F] transition-colors cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={increaseQuantity}
          disabled={loading}
        >
          +
        </button>
      </div>

      <div className="flex justify-between md:justify-start items-center py-2 md:py-0 border-t md:border-0 border-gray-100 mt-2 md:mt-0 font-bold text-gray-800">
        <span className="md:hidden text-gray-500 font-medium mr-2">Item Total:</span>
        <span className="text-lg md:text-base text-gray-800 font-bold">
          {(item.price * item.quantity).toFixed(2)}/-
        </span>
      </div>

      <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-3 mt-2 md:mt-0">
        <button
          className="p-2 md:p-2.5 rounded-lg border-none cursor-pointer text-sm font-semibold transition-all duration-300 bg-[#4E4A59] text-white hover:bg-[#2E2E3C] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleUpdate}
          disabled={loading || quantity === item.quantity}
        >
          {loading ? "Updating" : "Update"}
        </button>
        <button
          className="p-2 md:p-2.5 rounded-lg border-none cursor-pointer text-sm font-semibold transition-all duration-300 bg-[#F8B5B1] text-[#2E2E3C] hover:bg-[#ff9a94] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
