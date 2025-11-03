import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import profileReducer from "../slices/profile";
import themeReducer from "../slices/themeSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    profile: profileReducer,
    theme: themeReducer
});
export default rootReducer;