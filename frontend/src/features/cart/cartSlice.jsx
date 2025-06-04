import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const res = await axios.post(`/cart/${userId}`, { productId, quantity });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.cartItems; // update cart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to add to cart';
      });
  },
});

export default cartSlice.reducer;
