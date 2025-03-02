import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Получаем настройки из черновика (не финальной версии)
export const fetchSettings = createAsyncThunk("site/fetchSettings", async () => {
    const response = await axios.get("http://localhost:5000/api/draft");
    return response.data;
});

// 💾 Сохраняем изменения в черновик (с проверкой на изменения)
export const saveSettings = createAsyncThunk("site/saveSettings", async (_, { getState, dispatch }) => {
    const state = getState().site;
    await axios.patch("http://localhost:5000/api/draft", state);
    dispatch(fetchSettings()); // Обновляем Redux после сохранения
});

// 🚀 Публикация изменений (копирует данные в финальный магазин)
export const publishSettings = createAsyncThunk("site/publishSettings", async (_, { getState }) => {
    const state = getState().site;
    await axios.post("http://localhost:5000/api/publish", state);
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
        setLogo: (state, action) => { if (state.logo !== action.payload) state.logo = action.payload; },
        setBgImage: (state, action) => { if (state.bgImage !== action.payload) state.bgImage = action.payload; },
        setText: (state, action) => { if (state.text !== action.payload) state.text = action.payload; },
        setHeaderColor: (state, action) => { if (state.headerColor !== action.payload) state.headerColor = action.payload; },
        setButtonColor: (state, action) => { if (state.buttonColor !== action.payload) state.buttonColor = action.payload; },
        setButtonText: (state, action) => { if (state.buttonText !== action.payload) state.buttonText = action.payload; },
        setFooterText: (state, action) => { if (state.footerText !== action.payload) state.footerText = action.payload; },
        setFooterColor: (state, action) => { if (state.footerColor !== action.payload) state.footerColor = action.payload; },
        setPhone: (state, action) => { if (state.phone !== action.payload) state.phone = action.payload; },
        setEmail: (state, action) => { if (state.email !== action.payload) state.email = action.payload; },
        setAddress: (state, action) => { if (state.address !== action.payload) state.address = action.payload; },

        // 🔗 Обновление ссылки соцсетей (по `id`)
        updateSocialLink: (state, action) => {
            const { id, url } = action.payload;
            const socialLink = state.socialLinks.find(link => link.id === id);
            if (socialLink && socialLink.url !== url) {
                socialLink.url = url;
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
    }
});

export const { 
    setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText, 
    setFooterText, setFooterColor, setPhone, setEmail, setAddress, updateSocialLink  
} = siteSlice.actions;

const store = configureStore({
    reducer: {
        site: siteSlice.reducer
    }
});

export default store;
