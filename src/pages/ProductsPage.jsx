import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDraftProducts } from "../store/productsSlice";
import { Link } from "react-router-dom";

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { draftProducts } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchDraftProducts()).then((res) => {
            console.log("Загруженные товары:", res.payload); // ✅ Должны видеть `imageUrl`
        });
    }, [dispatch]);
    

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {draftProducts.map((product) => (
                    <Link 
                        to={`/product/${product._id}`} 
                        key={product._id}  // ✅ Используем _id вместо id
                        className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
                    >
                        <img src={product.imageUrl || "/placeholder.png"} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-700 font-medium">{product.price} ₸</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
