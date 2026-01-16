import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      // Item signature: { id (variantId), productId, name, price, image, software, color, ... }
      
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
        // Since digital products often don't need "quantity" > 1 per variant, 
        // but for completeness we allow it (e.g. buying licenses for team).
        const { id, quantity } = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item && quantity > 0) {
            item.quantity = quantity;
        }
        state.totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
