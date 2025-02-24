import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "../store/store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // ✅ Импорт хука для навигации


const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // ✅ Хук для перехода между страницами
    const { bgImage, text, buttonColor, buttonText } = useSelector((state) => state.site);

    // ✅ Загружаем настройки при первом рендере
    useEffect(() => {
        dispatch(fetchSettings());
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Контентная область занимает всю доступную высоту */}
            <div
                className="flex-1 flex items-center justify-center relative w-full"
                style={{
                    background: bgImage ? `url(${bgImage}) center/cover no-repeat` : "linear-gradient(135deg, #f0f0f0, #d9d9d9)",
                }}
            >
                <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center max-w-md">
                    <h1 className="text-4xl font-bold text-gray-900">{text}</h1>
                    <button
                        className="px-6 py-2 mt-5 text-white rounded-lg transition duration-300 hover:opacity-80"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => navigate("/products")} // ✅ Переход по маршруту /products
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
