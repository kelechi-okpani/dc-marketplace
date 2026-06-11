import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  // DevTools are automatically enabled in development environments
  devTools: process.env.NODE_ENV !== 'production',
});

// ==================== TYPE DEFINITIONS ====================

// Infer the `RootState` and `AppDispatch` types directly from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ==================== STRONG-TYPED HOOKS ====================

/**
 * Custom hook to safely dispatch actions with full TypeScript intellisense.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom hook to safely extract sliced data from the state tree without manual typings.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;