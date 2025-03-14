import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Получение товаров (черновик)
export const fetchDraftProducts = createAsyncThunk("products/fetchDraft", async () => {
    const response = await axios.get("http://localhost:5000/api/products/draft");
    return response.data;
});

// ✅ Добавление нового товара
export const addDraftProduct = createAsyncThunk("products/addDraft", async (product) => {
    const response = await axios.post("http://localhost:5000/api/products/draft", product);
    return response.data;
});

// ✅ Обновление товара
export const updateDraftProduct = createAsyncThunk(
    "products/updateDraftProduct",
    async ({ id, field, value }) => {
        if (!id) {
            throw new Error("Ошибка: ID товара не определён");
        }

        const response = await axios.patch(`http://localhost:5000/api/products/draft/${id}`, {
            [field]: value
        });

        return response.data;
    }
);


// ✅ Удаление товара
export const deleteDraftProduct = createAsyncThunk("products/deleteDraft", async (id) => {
    await axios.delete(`http://localhost:5000/api/products/draft/${id}`);
    return id;
});

// ✅ Публикация товаров
export const publishProducts = createAsyncThunk("products/publish", async () => {
    await axios.post("http://localhost:5000/api/products/publish");
});

const productsSlice = createSlice({
    name: "products",
    initialState: {
        draftProducts: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDraftProducts.fulfilled, (state, action) => {
                state.draftProducts = action.payload;
            })
            .addCase(addDraftProduct.fulfilled, (state, action) => {
                state.draftProducts.push(action.payload);
            })
            .addCase(updateDraftProduct.fulfilled, (state, action) => {
                const index = state.draftProducts.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.draftProducts[index] = action.payload;
                }
            })
            .addCase(deleteDraftProduct.fulfilled, (state, action) => {
                state.draftProducts = state.draftProducts.filter(p => p.id !== action.payload);
            });
    }
});

export default productsSlice.reducer;
