import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Левая часть — текст + кнопка */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Добро пожаловать в конструктор сайта</h1>
        <p className="text-lg text-center mb-8 text-gray-700">Нажмите "Начать", чтобы перейти к редактированию</p>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Начать
        </button>
      </div>

      {/* Правая часть — картинка */}
      <div className="w-1/2 h-full">
        <img
          src="/your-image.jpg" // или любой путь к файлу
          alt="Welcome"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default WelcomePage;
