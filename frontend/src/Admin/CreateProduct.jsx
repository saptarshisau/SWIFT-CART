import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function CreateProduct() {
    const { success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const categories = ["laptop", "shirt", "mobile", "tv", "pant", "fruits", "others"];

    const createProductSubmit = (e) => {
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
        dispatch(createProduct(myForm))
    }

    const createProductImage = (e) => {
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
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Product Created successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            setImage([]);
            setImagePreview([]);
        }
    }, [dispatch, error, success])
    return (
        <>
            <Navbar />
            <PageTitle title="Create Product" />
            <div className="max-w-2xl mt-24 mx-auto p-4 md:p-5 bg-white rounded-lg shadow-md mb-24">
                <h1 className="text-center text-2xl md:text-3xl mb-5 font-semibold text-gray-800">Create Product</h1>
                <form className="flex flex-col gap-3 md:gap-4" encType="multipart/form-data" onSubmit={createProductSubmit}>
                    <input
                        type="text"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                        placeholder="Enter Product Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                        placeholder="Enter Product Price"
                        required
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                        placeholder="Enter Product Description"
                        required
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 cursor-pointer"
                        required
                        name="category"
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
                    <input
                        type="number"
                        className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                        placeholder="Enter Product Stock"
                        required
                        name="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <div className="flex flex-col">
                        <input
                            type="file"
                            accept="image/"
                            className="p-3 border border-gray-300 rounded-md text-base focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800"
                            multiple
                            name="image"
                            onChange={createProductImage}
                        />
                    </div>
                    <div className="flex gap-3 mt-3 overflow-x-auto">
                        {imagePreview.map((img, index) => (
                            <img
                                src={img}
                                alt="Product Preview"
                                className="w-24 h-24 object-cover rounded-lg"
                                key={index}
                            />
                        ))}
                    </div>
                    <button
                        className="p-3 bg-slate-800 text-white text-lg rounded-md cursor-pointer transition-colors duration-300 hover:bg-slate-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Creating Product...' : 'Create'}
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default CreateProduct;
