import { RootState } from "./store";


export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalAmount = (state: RootState) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export const selectWishlistItemsCount = (state: RootState) => state.wishlist.items.length;