import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Globe  } from "lucide-react";


const Header = () => {
    const { logo, headerColor } = useSelector((state) => state.site);
    console.log("🔍 Логотип перед рендерингом:", logo);

    useEffect(() => {
      console.log("🔄 Redux обновился! Логотип:", logo);
  }, [logo]);


  return (
    <header className="flex justify-between items-center p-4 shadow-md " style={{ backgroundColor: headerColor }}>
{logo ? (
                <img src={logo} alt="Лого" className="h-12 object-contain" />
            ) : (
                <div className="h-10 w-20 p-[5px] bg-gray-200 flex items-center justify-center rounded-md">
                    Нет логотипа
                </div>
            )}

<nav className="flex space-x-6">
   <Link to="/mysite" className="text-lg font-semibold hover:text-blue-500">Басты бет</Link>
   <Link to="/products" className="text-lg font-semibold hover:text-blue-500">Каталог</Link>
</nav>

<div className="flex space-x-4 text-2xl">
    <Link to="/login" className="text-lg font-semibold hover:text-blue-500">   
        <User className="cursor-pointer" />
    </Link>
    <Link to="/domain" className="text-lg font-semibold hover:text-blue-500">   
        <Globe className="cursor-pointer" />
    </Link>
</div>
    </header>
  );
};

export default Header;
