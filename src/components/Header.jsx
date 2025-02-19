import { useSelector } from "react-redux";
import React, { useEffect } from "react";


const Header = () => {
    const { logo, headerColor } = useSelector((state) => state.site);
    console.log("🔍 Логотип перед рендерингом:", logo);

    useEffect(() => {
      console.log("🔄 Redux обновился! Логотип:", logo);
  }, [logo]);


  return (
    <header className="flex justify-between items-center p-4 shadow-md" style={{ backgroundColor: headerColor }}>
{logo ? (
                <img src={logo} alt="Лого" className="h-12 object-contain" />
            ) : (
                <div className="h-12 w-12 bg-gray-200 flex items-center justify-center rounded-md">
                    Нет логотипа
                </div>
            )}

      <nav className="flex space-x-6">
        <button className="text-lg font-semibold hover:text-blue-500">Главная</button>
        <button className="text-lg font-semibold hover:text-blue-500">Каталог</button>
        <button className="text-lg font-semibold hover:text-blue-500">Контакты</button>
      </nav>
      <div className="flex space-x-4 text-2xl">
        <span className="cursor-pointer">👤</span>
        <span className="cursor-pointer">🛒</span>
      </div>
    </header>
  );
};

export default Header;
