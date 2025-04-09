import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add-product",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/admin/products/add-product",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  }
);

// export const editProduct = createAsyncThunk(
//   "/products/edit-product",
//   async (id, formData) => {
//     const result = await axios.put(
//       `http://localhost:3000/api/admin/products/edit-product/${id}`,
//       formData,
//       { headers: { "Content-Type": "application/json" } }
//     );
//     return result?.data;
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "/products/delete-product",
//   async (id) => {
//     const result = await axios.delete(
//       "http://localhost:3000/api/admin/products/delete-product/:id"
//     );
//     return result?.data;
//   }
// );

export const listAllProducts = createAsyncThunk(
  "/products/list-products",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:3000/api/admin/products/products-list?id=${userId}`
    );
    return result?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    removeProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.listOfProducts;
      })
      .addCase(listAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export const { removeProduct } = AdminProductsSlice.actions;
export default AdminProductsSlice.reducer;
