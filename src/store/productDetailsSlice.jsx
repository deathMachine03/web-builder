import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Получение данных о товаре
export const fetchProductById = createAsyncThunk("product/fetchById", async (id) => {
    const res = await axios.get(`http://localhost:5000/api/products/draft/${id}`);
    return res.data;
});

// 📝 Обновление полей товара
export const updateProductField = createAsyncThunk(
    "product/updateField",
    async ({ id, field, value }) => {
        const res = await axios.patch(`http://localhost:5000/api/products/draft/${id}`, {
            [field]: value,
        });
        return res.data;
    }
);

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: {
        product: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearProduct: (state) => {
            state.product = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.product = action.payload;
                state.loading = false;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProductField.fulfilled, (state, action) => {
                state.product = action.payload;
            });
    },
});

export const { clearProduct } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
