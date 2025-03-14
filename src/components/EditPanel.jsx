import { useDispatch, useSelector } from "react-redux";
import {
    setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText,
    setFooterText, setFooterColor, setPhone, setEmail, setAddress, updateSocialLink, saveSettings,publishSettings
} from "../store/store";
import {
    fetchDraftProducts, addDraftProduct, updateDraftProduct, deleteDraftProduct, publishProducts
} from "../store/productsSlice";
import { ChevronRight, ChevronLeft, Trash2, PlusCircle } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const EditPanel = ({ isOpen, togglePanel }) => {

    const dispatch = useDispatch();
    const location = useLocation();
    
    // ✅ Проверка текущей страницы (Главная / Товары)
    const isHomePage = location.pathname === "/";
    const isProductsPage = location.pathname === "/products";

    // Данные для главной страницы
    const { logo, bgImage, text, headerColor, buttonColor, buttonText, 
        footerText, footerColor, phone, email, address, socialLinks 
    } = useSelector((state) => state.site);
    // Данные для товаров
    const draftProducts = useSelector((state) => state.products.draftProducts);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", image: "" });
    
    
    useEffect(() => {
        dispatch(fetchDraftProducts());
    }, [dispatch]);

    // ✅ Проверяем, есть ли уже загруженные данные, перед обновлением Redux
    const updateState = (setter, value) => {
        if (value !== undefined && value !== null) {
            dispatch(setter(value));
        }
    };

    // ✅ Функции работы с товарами
    const handleAddProduct = () => {
        const newProduct = {
            name: "Новый товар",   // Значение по умолчанию
            price: 0,              // Цена по умолчанию
            description: "",        // Описание пустое
            image: ""              // Без изображения
        };
    
        dispatch(addDraftProduct(newProduct));
    };
    

    const handleUpdateProduct = (id, field, value) => {
        dispatch(updateDraftProduct({ id, field, value }));
    };
    
    const handleDeleteProduct = (id) => {
        dispatch(deleteDraftProduct(id));
    };

    // ✅ Функция сохранения изменений
    const handleSave = () => {
        dispatch(saveSettings());
    };

    // ✅ Функция загрузки изображений (логотип, фон, изображения товаров)
    const uploadFile = async (file, type, productId = null) => {
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);
    
        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            if (type === "logo") dispatch(setLogo(res.data.url));
            if (type === "bgImage") dispatch(setBgImage(res.data.url));
            if (type === "productImage" && productId) {
                dispatch(updateDraftProduct({ id: productId, field: "image", value: res.data.url }));
            }
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
        }
    };
    
    
    
    // Локальное состояние для ссылок соцсетей
    const [updatedLinks, setUpdatedLinks] = useState(socialLinks);
    const [panelHeight, setPanelHeight] = useState(window.innerHeight); // Начальная высота
    
    // ✅ Обновляем ссылку
    const handleChange = (id, value) => {
        dispatch(updateSocialLink({ id, url: value }));
    };

    // ✅ Функция обновления высоты панели при прокрутке
    const updatePanelHeight = () => {
        const newHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight);
        setPanelHeight(newHeight);
    };

    // ✅ Добавляем и удаляем обработчик прокрутки
    useEffect(() => {
        window.addEventListener("scroll", updatePanelHeight);
        window.addEventListener("resize", updatePanelHeight);
        updatePanelHeight(); // Вызываем сразу, чтобы высота обновилась при загрузке

        return () => {
            window.removeEventListener("scroll", updatePanelHeight);
            window.removeEventListener("resize", updatePanelHeight);
        };
    }, []);
    
    
    
    return (
        <div className="relative transition-all duration-300 flex">
            {/* Панель редактирования с фиксированной высотой и скроллом */}
            <div className={`bg-white shadow-lg border-l border-gray-200 transition-all duration-300 flex flex-col 
                ${isOpen ? "w-72" : "w-0 p-0 overflow-hidden"} max-h-screen fixed top-0 right-0 bottom-0`}>
                
                {isOpen && (
                    <>
                        {/* Контент со скроллом */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <h2 className="text-xl font-bold mb-4">Редактирование</h2>
                        {/* ✅ Настройки главной страницы */}
                        {isHomePage && (
                            <>
                            {/* Логотип */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Логотип</label>
                                <input type="file" className="w-full text-sm" onChange={(e) => uploadFile(e.target.files[0], "logo")} />
                                {logo ? (
                                    <img src={logo} alt="Лого" className="mt-2 h-16 mx-auto" />
                                ) : (
                                    <div className="h-20 w-18 mx-auto bg-gray-200 rounded-md flex items-center justify-center">
                                        Нет логотипа
                                    </div>
                                )}
                            </div>

                            {/* Фоновое изображение */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Фоновое изображение</label>
                                <input type="file" className="w-full text-sm" onChange={(e) => uploadFile(e.target.files[0], "bgImage")} />
                                {bgImage ? (
                                    <img src={bgImage} alt="Фон" className="mt-2 h-16 w-full object-cover rounded" />
                                ) : (
                                    <div className="h-20 w-full bg-gray-200 rounded flex items-center justify-center">
                                        Нет фонового изображения
                                    </div>
                                )}
                            </div>

                            {/* Цвет шапки */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Цвет шапки</label>
                                <input type="color" value={headerColor} onChange={(e) => updateState(setHeaderColor, e.target.value)} className="w-full" />
                            </div>

                            {/* Цвет кнопки */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Цвет кнопки</label>
                                <input type="color" value={buttonColor} onChange={(e) => updateState(setButtonColor, e.target.value)} className="w-full" />
                            </div>

                            {/* Текст кнопки */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Текст кнопки</label>
                                <input type="text" value={buttonText} onChange={(e) => updateState(setButtonText, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Текст в блоке */}
                            <div className="mb-6">
                                <label className="block mb-2 font-semibold">Текст в блоке</label>
                                <input type="text" value={text} onChange={(e) => updateState(setText, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Редактирование футера */}
                            <h2 className="text-xl font-bold mb-4">Редактирование футера</h2>

                            {/* Текст футера */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Текст футера</label>
                                <input type="text" value={footerText} onChange={(e) => updateState(setFooterText, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>

                            {/* Цвет футера */}
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Цвет фона футера</label>
                                <input type="color" value={footerColor} onChange={(e) => updateState(setFooterColor, e.target.value)} className="w-full" />
                            </div>

                            {/* Контактные данные */}
                            <h3 className="text-lg font-semibold mt-4">Контакты</h3>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Телефон</label>
                                <input type="text" value={phone} onChange={(e) => updateState(setPhone, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Email</label>
                                <input type="email" value={email} onChange={(e) => updateState(setEmail, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Адрес</label>
                                <input type="text" value={address} onChange={(e) => updateState(setAddress, e.target.value)} className="w-full p-2 border rounded-md" />
                            </div>

                            <div className="mb-4">
                                {updatedLinks.map((link) => (
                                    <div key={link.id} className="mb-4">
                                        <label className="block font-semibold mb-1">{link.name}</label>
                                        <input
                                            type="text"
                                            value={link.url}
                                            onChange={(e) => handleChange(link.id, e.target.value)}
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Введите ссылку"
                                        />
                                    </div>
                                ))}
                            </div>
                            </>
                        )}
                         
                        {/* ✅ Настройки товаров */}
                        {isProductsPage && (
                            <>
                                <h2 className="text-xl font-bold mb-4">Товары</h2>

                                <button onClick={handleAddProduct} className="bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                    <PlusCircle size={20} />
                                    Добавить товар
                                </button>

                                {draftProducts.map((product) => (
                            <div key={product._id} className="border p-4 rounded-md mt-4 shadow-sm">
                                <label className="block font-semibold">Название</label>
                                <input 
                                    type="text" 
                                    value={product.name} 
                                    onChange={(e) => handleUpdateProduct(product._id, "name", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Цена</label>
                                <input 
                                    type="number" 
                                    value={product.price} 
                                    onChange={(e) => handleUpdateProduct(product._id, "price", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Описание</label>
                                <textarea 
                                    value={product.description} 
                                    onChange={(e) => handleUpdateProduct(product._id, "description", e.target.value)} 
                                    className="w-full p-2 border rounded-md mb-2"
                                />

                                <label className="block font-semibold">Изображение</label>
                                <input 
                                    type="file" 
                                    className="w-full text-sm mb-2" 
                                    onChange={(e) => uploadFile(e.target.files[0], "productImage", product._id)} 
                                />
                                {product.image ? (
                                    <img src={product.image} alt="Товар" className="mt-2 h-16 w-full object-cover rounded" />
                                ) : (
                                    <div className="h-16 w-full bg-gray-200 rounded flex items-center justify-center">
                                        Нет изображения
                                    </div>
                                )}

                                <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 flex items-center gap-2">
                                    <Trash2 size={18} />
                                    Удалить
                                </button>
                            </div>
                        ))}
                            </>
                        )}

                        <button onClick={handleSave} 
                        className="mt-4 bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition">
                            Сохранить
                        </button>

                        <button onClick={() => dispatch(publishSettings())} 
                        className="mt-2 bg-green-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-green-700 transition">
                            Опубликовать
                        </button>
                        </div>
                    </>
                    )}
            </div>

            {/* Кнопка сворачивания */}
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-l-md transition-all duration-300" onClick={togglePanel}>
                {isOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
            </button>
        </div>
    );
};

export default EditPanel;
