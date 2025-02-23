import { useDispatch, useSelector } from "react-redux";
import {
    setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText,
    setFooterText, setFooterColor, setPhone, setEmail, setAddress, updateSocialLink, saveSettings
} from "../store/store";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const EditPanel = ({ isOpen, togglePanel }) => {
    const dispatch = useDispatch();
    const { logo, bgImage, text, headerColor, buttonColor, buttonText, footerText, footerColor, phone, email, address, socialLinks } = useSelector((state) => state.site);

    const [panelHeight, setPanelHeight] = useState(window.innerHeight); // Начальная высота
    const [updatedLinks, setUpdatedLinks] = useState(socialLinks);

    // ✅ Обновляем ссылку
    const handleChange = (id, value) => {
        const newLinks = updatedLinks.map(link =>
            link.id === id ? { ...link, url: value } : link
        );
        setUpdatedLinks(newLinks);
    };

    // ✅ Сохранение
    const saveSocialLinks = () => {
        updatedLinks.forEach(link => {
            dispatch(updateSocialLink({ id: link.id, url: link.url }));
        });
        dispatch(saveSettings());
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


    // ✅ Проверяем, есть ли уже загруженные данные, перед обновлением Redux
    const updateState = (setter, value) => {
        if (value !== undefined && value !== null) {
            dispatch(setter(value));
        }
    };

    const uploadFile = async (file, type) => {
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        if (type === "logo") dispatch(setLogo(fileURL));
        if (type === "bgImage") dispatch(setBgImage(fileURL));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (type === "logo") dispatch(setLogo(res.data.url));
            if (type === "bgImage") dispatch(setBgImage(res.data.url));
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
        }
    };

    const handleSave = () => {
        dispatch(saveSettings());
    };

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

                            <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition">
                                Сохранить
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
