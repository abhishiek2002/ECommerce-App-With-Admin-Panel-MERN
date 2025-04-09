import axios from "axios";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  productList: {},
};

export const listAllProducts = createAsyncThunk(
  "/products/list-products",
  async () => {
    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get`
    );
    return result?.data;
  }
);

const ShopProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(listAllProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = ShopProductSlice.actions;
export default ShopProductSlice.reducer;
