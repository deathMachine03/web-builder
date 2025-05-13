import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "./store/store";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditPanel from "./components/EditPanel";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const AppContent = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.site);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  console.log("🔍 Текущий Redux State:", siteState);

  // Указываем маршруты, где скрываем layout
  const hiddenLayoutRoutes = ["/welcome", "/login", "/register"];
  const isMinimalPage = hiddenLayoutRoutes.includes(location.pathname);

  return isMinimalPage ? (
    // Отображаем только контент
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  ) : (
    // Страницы с layout (Header, Footer, EditPanel)
    <div className="relative flex flex-col h-screen">
      <div className="relative flex flex-grow transition-all duration-300">
        <div
          className={`transition-all duration-300 flex flex-col ${
            isPanelOpen ? "w-[calc(100%-18rem)]" : "w-full"
          }`}
        >
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/mysite" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <EditPanel isOpen={isPanelOpen} togglePanel={() => setIsPanelOpen(!isPanelOpen)} />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
