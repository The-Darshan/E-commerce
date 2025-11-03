import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  total :0,
  totalItems:0
};

const cartSlice = createSlice({

    name: "cart",
    initialState:initialState,
    reducers:{
        addToCart(state,action){
            const product = action.payload;
            const existingItem = state.items.findIndex((item) => item.id === product.id);

            if(existingItem>=0){
                toast.error("Product already in cart");
                return;
            }

            state.items.push(product);
            ++state.totalItems;
            state.total += product.price;
            toast.success("Product added to cart");
        },

        removefromCart(state,action){
            const product = action.payload;
            const indx = state.items.findIndex((indx)=> indx.id === product.id);

            if(indx>=0){
                const itemToRemove = state.items[indx];
                state.total -= itemToRemove.price;
                state.items.splice(indx,1);
                state.totalItems = state.items.length;
                toast.success("Product removed from cart");
            }
        },

        resetCart(state){
            state.items = [];
            state.total = 0;
            state.totalItems = 0;
        }
    }

})

export const {addToCart,removefromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;