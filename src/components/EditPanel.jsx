import { useDispatch, useSelector } from "react-redux";
import {
    setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText,
    setFooterText, setFooterColor, setPhone, setEmail, setAddress, updateSocialLink, 
    saveSettings, publishSettings
} from "../store/store";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const EditPanel = ({ isOpen, togglePanel }) => {
    const dispatch = useDispatch();
    const { logo, bgImage, text, headerColor, buttonColor, buttonText, 
            footerText, footerColor, phone, email, address, socialLinks } = useSelector((state) => state.site);

    const [isPublishing, setIsPublishing] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // ✅ Функция обновления высоты панели при прокрутке
    useEffect(() => {
        const updatePanelHeight = () => {
            document.documentElement.style.setProperty("--panel-height", `${Math.max(window.innerHeight, document.documentElement.scrollHeight)}px`);
        };
        window.addEventListener("scroll", updatePanelHeight);
        window.addEventListener("resize", updatePanelHeight);
        updatePanelHeight();

        return () => {
            window.removeEventListener("scroll", updatePanelHeight);
            window.removeEventListener("resize", updatePanelHeight);
        };
    }, []);

    // ✅ Обновление значений в Redux
    const updateState = (setter, value) => {
        if (value !== undefined && value !== null) {
            dispatch(setter(value));
        }
    };

    // ✅ Обновление ссылок соцсетей в Redux (без локального состояния)
    const updateLink = (id, url) => {
        dispatch(updateSocialLink({ id, url }));
    };

    // ✅ Загрузка файлов
    const uploadFile = async (file, type) => {
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        dispatch(type === "logo" ? setLogo(fileURL) : setBgImage(fileURL));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            dispatch(type === "logo" ? setLogo(res.data.url) : setBgImage(res.data.url));
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
        }
    };

    // ✅ Сохранение изменений в черновик
    const handleSave = async () => {
        setIsSaved(false);
        await dispatch(saveSettings());
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000); // Уведомление исчезает через 2 секунды
    };

    // ✅ Публикация настроек
    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            await dispatch(publishSettings());
            alert("Настройки успешно опубликованы!");
        } catch (error) {
            alert("Ошибка при публикации. Попробуйте снова.");
        }
        setIsPublishing(false);
    };

    return (
        <div className="relative transition-all duration-300 flex">
            {/* Панель редактирования */}
            <div className={`bg-white shadow-lg border-l border-gray-200 transition-all duration-300 flex flex-col 
                ${isOpen ? "w-72" : "w-0 p-0 overflow-hidden"} max-h-screen fixed top-0 right-0 bottom-0`}>
                {isOpen && (
                    <div className="flex-1 overflow-y-auto p-6">
                        <h2 className="text-xl font-bold mb-4">Редактирование</h2>

                        {/* Логотип */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Логотип</label>
                            <input type="file" className="w-full text-sm" onChange={(e) => uploadFile(e.target.files[0], "logo")} />
                            <img src={logo} alt="Лого" className="mt-2 h-16 mx-auto" />
                        </div>

                        {/* Цвет шапки */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Цвет шапки</label>
                            <input type="color" value={headerColor} onChange={(e) => updateState(setHeaderColor, e.target.value)} className="w-full" />
                        </div>

                        {/* Контактные данные */}
                        <h3 className="text-lg font-semibold mt-4">Контакты</h3>
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Телефон</label>
                            <input type="text" value={phone} onChange={(e) => updateState(setPhone, e.target.value)} className="w-full p-2 border rounded-md" />
                        </div>

                        {/* Социальные сети */}
                        <h3 className="text-lg font-semibold mt-4">Социальные сети</h3>
                        {socialLinks.map((link) => (
                            <div key={link.id} className="mb-4">
                                <label className="block font-semibold mb-1">{link.name}</label>
                                <input
                                    type="text"
                                    value={link.url}
                                    onChange={(e) => updateLink(link.id, e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Введите ссылку"
                                />
                            </div>
                        ))}

                        {/* Кнопки сохранения и публикации */}
                        <button onClick={handleSave} 
                            className="bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition mt-4">
                            {isSaved ? "✔ Сохранено" : "Сохранить"}
                        </button>

                        <button 
                            onClick={handlePublish}
                            className="bg-green-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-green-700 transition mt-2 disabled:opacity-50"
                            disabled={isPublishing}
                        >
                            {isPublishing ? "Публикация..." : "Опубликовать"}
                        </button>
                    </div>
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
