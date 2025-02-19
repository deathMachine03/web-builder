import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное получение настроек с сервера
export const fetchSettings = createAsyncThunk("site/fetchSettings", async () => {
    const response = await axios.get("http://localhost:5000/settings");
    return response.data;
});

// Асинхронное сохранение настроек на сервере
export const saveSettings = createAsyncThunk("site/saveSettings", async (_, { getState }) => {
    const state = getState().site;
    await axios.patch("http://localhost:5000/settings", state);
});

const siteSlice = createSlice({
    name: "site",
    initialState: {
        logo: "",
        bgImage: "",
        text: "Добро пожаловать!",
        headerColor: "#ffffff",
        buttonColor: "#007bff",
        buttonText: "Перейти к товарам"
    },
    reducers: {
        setLogo: (state, action) => { state.logo = action.payload; },
        setBgImage: (state, action) => { state.bgImage = action.payload; },
        setText: (state, action) => { state.text = action.payload; },
        setHeaderColor: (state, action) => { state.headerColor = action.payload; },
        setButtonColor: (state, action) => { state.buttonColor = action.payload; },
        setButtonText: (state, action) => { state.buttonText = action.payload; }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
    }
});

export const { setLogo, setBgImage, setText, setHeaderColor, setButtonColor, setButtonText } = siteSlice.actions;

const store = configureStore({
    reducer: {
        site: siteSlice.reducer
    }
});

export default store;
