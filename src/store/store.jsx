import { configureStore } from "@reduxjs/toolkit";
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
    updateSocialLink } from "./siteSlice";
import productsReducer, { 
    fetchDraftProducts, 
    addDraftProduct, 
    updateDraftProduct, 
    deleteDraftProduct, 
    publishProducts } from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";

const store = configureStore({
    reducer: {
        site: siteReducer,
        products: productsReducer,
        productDetails: productDetailsReducer,

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
