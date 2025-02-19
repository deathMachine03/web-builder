import React, { useState, useEffect } from "react";
import { useDispatch,useSelector  } from "react-redux";
import { fetchSettings } from "./store/store"; // Импортируем action
import HomePage from "./pages/HomePage.jsx";
import EditPanel from "./components/EditPanel.jsx";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.site); // Получаем текущий state


  // Загружаем данные из MongoDB в Redux при запуске приложения
  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  console.log("🔍 Текущий Redux State:", siteState); // Лог в консоль

  // Ждем загрузки данных перед рендерингом
  if (!siteState.logo) {
    return <div className="flex items-center justify-center h-screen">Загрузка...</div>;
}

  return (
    <div className="relative flex h-screen transition-all duration-300">
      {/* Главная страница: изменяет ширину при открытии/закрытии панели */}
      <div className={`transition-all duration-300 ${isPanelOpen ? "w-[calc(100%-18rem)]" : "w-full"}`}>
        <HomePage />
      </div>

      {/* Панель редактирования */}
      <EditPanel isOpen={isPanelOpen} togglePanel={() => setIsPanelOpen(!isPanelOpen)} />
    </div>
  );
}

export default App;
