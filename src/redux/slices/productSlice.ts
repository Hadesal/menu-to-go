import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllProductsByCategoryId,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../services/api/productsCrud";
import { ProductData } from "../../DataTypes/ProductDataTypes";

export interface ProductState {
  productList: ProductData[];
  selectedProduct: ProductData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ProductState = {
  productList: [],
  selectedProduct: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByCategoryId(categoryId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      categoryId,
      product,
    }: { categoryId: string | undefined; product: ProductData },
    { rejectWithValue }
  ) => {
    try {
      const response = await addProduct(categoryId, product);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error creating product");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (
    { categoryId, productId }: { categoryId: string; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getProductById(categoryId, productId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  }
);

export const modifyProduct = createAsyncThunk(
  "products/modifyProduct",
  async (
    {
      categoryId,
      productId,
      updatedProduct,
    }: {
      categoryId: string | undefined;
      productId: string;
      updatedProduct: ProductData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProduct(
        categoryId,
        productId,
        updatedProduct
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating product");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (
    {
      categoryId,
      productId,
    }: { categoryId: string | undefined; productId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await deleteProduct(categoryId, productId);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error deleting product");
    }
  }
);

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductList: (state, action: PayloadAction<ProductData[]>) => {
      state.productList = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductData | null>) => {
      state.selectedProduct = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload);
        state.loading = false;
        state.successMessage = "Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(modifyProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        state.productList = state.productList.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.loading = false;
        state.successMessage = "Product updated successfully!";
      })
      .addCase(modifyProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
        state.successMessage = "Product deleted successfully!";
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setProductList,
  setSelectedProduct,
  clearSuccessMessage,
  clearErrorMessage,
} = ProductSlice.actions;

export default ProductSlice.reducer;
