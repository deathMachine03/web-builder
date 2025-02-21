import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "./store/store"; // Импортируем action
import HomePage from "./pages/HomePage.jsx";
import EditPanel from "./components/EditPanel.jsx";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Состояние панели редактирования
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.site); // Получаем текущий state
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  // Загружаем данные из MongoDB в Redux при запуске приложения
  useEffect(() => {
    dispatch(fetchSettings()).then(() => setLoading(false)); // Убираем загрузку после запроса
  }, [dispatch]);

  // Проверяем состояние загрузки перед рендерингом UI
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Загрузка...</div>;
  }

  return (
    <div className="relative flex h-screen transition-all duration-300">
      {/* Главная страница: ширина меняется при открытии панели */}
      <div className={`transition-all duration-300 ${isPanelOpen ? "w-[calc(100%-18rem)]" : "w-full"}`}>
        <HomePage />
      </div>

      {/* Панель редактирования */}
      <EditPanel isOpen={isPanelOpen} togglePanel={() => setIsPanelOpen(!isPanelOpen)} />
    </div>
  );
}

export default App;
