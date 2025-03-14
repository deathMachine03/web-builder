import { configureStore } from "@reduxjs/toolkit";

// ✅ Импортируем reducer и экшены для сайта
import siteReducer, { 
    fetchSettings, 
    saveSettings, 
    publishSettings, 
    setLogo, 
    setBgImage, 
    setText, 
    setHeaderColor, 
    setButtonColor, 
    setButtonText, 
    setFooterText, 
    setFooterColor, 
    setPhone, 
    setEmail, 
    setAddress, 
    updateSocialLink 
} from "./siteSlice";

// ✅ Импортируем reducer и экшены для товаров
import productsReducer, { 
    fetchDraftProducts, 
    addDraftProduct, 
    updateDraftProduct, 
    deleteDraftProduct, 
    publishProducts 
} from "./productsSlice";

// ✅ Создаем store с двумя редюсерами
const store = configureStore({
    reducer: {
        site: siteReducer,
        products: productsReducer,
    }
});

// ✅ Экспортируем ВСЕ экшены, чтобы можно было импортировать их в других компонентах
export { 
    fetchSettings, 
    saveSettings, 
    publishSettings, 
    setLogo, 
    setBgImage, 
    setText, 
    setHeaderColor, 
    setButtonColor, 
    setButtonText, 
    setFooterText, 
    setFooterColor, 
    setPhone, 
    setEmail, 
    setAddress, 
    updateSocialLink, 
    fetchDraftProducts, 
    addDraftProduct, 
    updateDraftProduct, 
    deleteDraftProduct, 
    publishProducts 
};

export default store;
