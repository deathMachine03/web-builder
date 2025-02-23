import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Загружаем настройки с сервера
export const fetchSettings = createAsyncThunk("site/fetchSettings", async () => {
    const response = await axios.get("http://localhost:5000/settings");
    return response.data;
});

// 💾 Сохраняем настройки на сервере
export const saveSettings = createAsyncThunk("site/saveSettings", async (_, { getState, dispatch }) => {
    const state = getState().site;
    await axios.patch("http://localhost:5000/settings", state);
    dispatch(fetchSettings()); // Обновляем Redux после сохранения


});

const siteSlice = createSlice({
    name: "site",
    initialState: {
        logo: "",
        bgImage: "",
        text: "Добро пожаловать!",
        headerColor: "#ffffff",
        buttonColor: "#007bff",
        buttonText: "Перейти к товарам",
        footerText: "© 2025 Все права защищены",
        footerColor: "#1a1a1a",
        phone: "+7 (999) 123-45-67",
        email: "info@example.com",
        address: "г. Алматы, ул. Абая 10",
        socialLinks: [
            { id: 1, name: "Instagram", url: "https://instagram.com" },
            { id: 2, name: "Facebook", url: "https://facebook.com" },
            { id: 3, name: "Twitter", url: "https://twitter.com" }
        ]
    },
    reducers: {
        setLogo: (state, action) => { state.logo = action.payload; },
        setBgImage: (state, action) => { state.bgImage = action.payload; },
        setText: (state, action) => { state.text = action.payload; },
        setHeaderColor: (state, action) => { state.headerColor = action.payload; },
        setButtonColor: (state, action) => { state.buttonColor = action.payload; },
        setButtonText: (state, action) => { state.buttonText = action.payload; },
        setFooterText: (state, action) => { state.footerText = action.payload; },
        setFooterColor: (state, action) => { state.footerColor = action.payload; },
        setPhone: (state, action) => { state.phone = action.payload; },
        setEmail: (state, action) => { state.email = action.payload; },
        setAddress: (state, action) => { state.address = action.payload; },
        setSocialLinks: (state, action) => { state.socialLinks = action.payload; },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
    }
});

export const { setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText, setFooterText, setFooterColor, setPhone, setEmail, setAddress, updateSocialLink  } = siteSlice.actions;

const store = configureStore({
    reducer: {
        site: siteSlice.reducer
    }
});

export default store;
