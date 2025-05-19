import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
    <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white p-10"> 
        <h1 className="text-6xl font-bold mb-6 text-center">Веб-сайт құрастырушысына қош келдіңіз</h1>
        <p className="text-2xl text-center mb-8 text-gray-700">Сайтты құрауды бастау үшін «Бастау» түймесін басыңыз.</p>
        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-2xl hover:bg-blue-700 transition"
        >
          Бастау
        </button>
        <p className="mt-6 text-lg text-gray-600">
  Аккаунтыңыз бар ма?{" "}
  <span
    onClick={() => navigate("/login")}
    className="text-blue-600 cursor-pointer hover:underline"
  >
    Кіру
  </span>
</p>


      </div>

      <div className="w-1/2 h-full">
        <img
          src="/images/constructor_1x.png"
          alt="Welcome"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default WelcomePage;
