import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../features/products/productSlice";
import { removeErrors, removeSuccess, updateProduct } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const { product } = useSelector(state => state.product)
  const { success, error, loading } = useSelector(state => state.admin)


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();
  const categories = ["mobile", "fruits", "laptop", "shirt", "shoes", "pants", "glass", "watch", "cookies", "Pomegranate", "socks", "bag", "mouse", "headphone", "bucket", "bangle", "ring", "lcd", "jacket", "tops"];

  useEffect(() => {
    dispatch(getProductDetails(updateId))
  }, [dispatch, updateId])
  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setStock(product.stock)
      setOldImage(product.image)
    }
  }, [product])
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImage((old) => [...old, reader.result]);

        }
      }
      reader.readAsDataURL(file)
    })
  }
  const updateProductSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);
    image.forEach((img) => {
      myForm.append("image", img)
    })
    dispatch(updateProduct({ id: updateId, formData: myForm }))
  }
  useEffect(() => {
    if (success) {
      toast.success("Product Updated Successfully", { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess())
      navigate('/admin/products')
    }
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors())
    }
  }, [dispatch, error, success])
  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <div className="w-full max-w-[800px] mx-auto my-10 md:my-16 p-6 md:p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#3B3B4F] mb-10">Update Product</h1>
        <form className="flex flex-col gap-6" encType="multipart/form-data" onSubmit={updateProductSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-[#4E4A59]">Product Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow"
              required
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="font-semibold text-[#4E4A59]">Product Price</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow"
              required
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold text-[#4E4A59]">Product Description</label>
            <textarea
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow h-[120px] resize-none"
              required
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold text-[#4E4A59]">Product Category</label>
            <select
              name="category"
              id="category"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a Category</option>
              {categories.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="stock" className="font-semibold text-[#4E4A59]">Product Stock</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#6C5B7B]/50 transition-shadow"
              required
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="font-semibold text-[#4E4A59]">Product Images</label>
            <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
              <input type="file" accept="image/" name="image" multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#6C5B7B]/10 file:text-[#6C5B7B] hover:file:bg-[#6C5B7B]/20 transition-colors" onChange={handleImageChange} />
            </div>
          </div>
          
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {imagePreview.map((img, index) => (
                <img src={img} alt="Product Preview" key={index} className="w-full aspect-square object-cover rounded-lg border border-gray-200 shadow-sm" />
              ))}
            </div>
          )}

          {oldImage.length > 0 && imagePreview.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {oldImage.map((img, index) => (
                <img src={img.url.replace('./', '/')} alt="Old Product Preview" key={index} className="w-full aspect-square object-cover rounded-lg border border-gray-200 shadow-sm opacity-80" />
              ))}
            </div>
          )}

          <button className="w-full py-3 mt-4 bg-[#6C5B7B] hover:bg-[#4E4A59] text-white font-bold rounded-lg transition-colors duration-300 shadow-md text-lg">{loading ? 'Updating...' : 'Update'}</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default UpdateProduct;
