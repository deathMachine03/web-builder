import { useDispatch, useSelector } from "react-redux";
import { setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText, saveSettings, fetchSettings } from "../store/store.jsx";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const EditPanel = ({ isOpen, togglePanel }) => {
    const dispatch = useDispatch();
    const { logo, bgImage, text, headerColor, buttonColor, buttonText } = useSelector((state) => state.site);


    const uploadFile = async (file, type) => {
        if (!file) return;

        const fileURL = URL.createObjectURL(file);

        if (type === "logo") {
            dispatch(setLogo(fileURL));
        }
        if (type === "bgImage") {
            dispatch(setBgImage(fileURL));
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (type === "logo") {
                dispatch(setLogo(res.data.url));
            }
            if (type === "bgImage") {
                dispatch(setBgImage(res.data.url));
            }
        } catch (error) {
            console.error("Ошибка загрузки файла:", error);
        }
    };

    const handleSave = () => {
        dispatch(saveSettings());
    };

    return (
        <div className="relative h-screen transition-all duration-300 flex">
            <div className={`h-full bg-white shadow-lg border-l border-gray-200 transition-all duration-300 flex flex-col ${isOpen ? "w-72 p-6" : "w-0 p-0 overflow-hidden"}`}>
                {isOpen && (
                    <>
                        <h2 className="text-xl font-bold mb-4">Редактирование</h2>

                        {/* Логотип */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Логотип</label>
                            <input type="file" className="w-full text-sm" onChange={(e) => uploadFile(e.target.files[0], "logo")} />
                            {logo ? (
                                <img src={logo} alt="Лого" className="mt-2 h-16 mx-auto" />
                            ) : (
                                <div className="h-16 w-16 mx-auto bg-gray-200 rounded-md flex items-center justify-center">
                                    Нет логотипа
                                </div>
                            )}
                        </div>

                        {/* Фон */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Фоновое изображение</label>
                            <input type="file" className="w-full text-sm" onChange={(e) => uploadFile(e.target.files[0], "bgImage")} />
                            {bgImage ? (
                                <img src={bgImage} alt="Фон" className="mt-2 h-16 w-full object-cover rounded" />
                            ) : (
                                <div className="h-16 w-full bg-gray-200 rounded flex items-center justify-center">
                                    Нет фонового изображения
                                </div>
                            )}
                        </div>

                        {/* Цвет шапки */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Цвет шапки</label>
                            <input type="color" value={headerColor} onChange={(e) => dispatch(setHeaderColor(e.target.value))} className="w-full" />
                        </div>

                        {/* Цвет кнопки */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Цвет кнопки</label>
                            <input type="color" value={buttonColor} onChange={(e) => dispatch(setButtonColor(e.target.value))} className="w-full" />
                        </div>

                        {/* Текст кнопки */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Текст кнопки</label>
                            <input type="text" value={buttonText} onChange={(e) => dispatch(setButtonText(e.target.value))} className="w-full p-2 border rounded-md" />
                        </div>

                        {/* Текст */}
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold">Текст в блоке</label>
                            <input type="text" value={text} onChange={(e) => dispatch(setText(e.target.value))} className="w-full p-2 border rounded-md" />
                        </div>

                        <button onClick={handleSave} className="bg-blue-600 text-white p-2 rounded-lg w-full text-lg font-semibold hover:bg-blue-700 transition">
                            Сохранить
                        </button>
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
