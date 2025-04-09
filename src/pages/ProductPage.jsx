import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, clearProduct } from "../store/productDetailsSlice";

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(fetchProductById(id));

        return () => {
            dispatch(clearProduct()); // Очистить данные при размонтировании
        };
    }, [dispatch, id]);

    if (loading) {
        return <div className="p-6 text-center">Загрузка...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600 text-center">Ошибка: {error}</div>;
    }

    if (!product) {
        return <div className="p-6 text-center">Товар не найден</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start bg-white shadow rounded p-6">
                <div className="w-full md:w-1/3">
                    <img
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        className="rounded w-full object-cover h-64"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description || "Нет описания"}</p>
                    <p className="text-xl font-semibold">{product.price} ₸</p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
