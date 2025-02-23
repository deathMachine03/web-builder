import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "./store/store";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditPanel from "./components/EditPanel";

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.site);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  console.log("🔍 Текущий Redux State:", siteState);

  return (
    <Router>
      <div className="relative flex flex-col h-screen">
        <div className="relative flex flex-grow transition-all duration-300">
          {/* Основная часть, включая Header и Footer */}
          <div className={`transition-all duration-300 flex flex-col ${isPanelOpen ? "w-[calc(100%-18rem)]" : "w-full "}`}>
            {/* Статичный Header */}
            <Header />

            {/* Контейнер для страниц (растягивается на всю доступную высоту) */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Routes>
            </div>

            {/* Footer - появляется при прокрутке */}
            <Footer />
          </div>

          {/* EditPanel располагается сбоку и уменьшает ширину всего контента */}
          <EditPanel isOpen={isPanelOpen} togglePanel={() => setIsPanelOpen(!isPanelOpen)} />
        </div>
      </div>
    </Router>
  );
}

export default App;
