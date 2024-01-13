import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  totalPrice: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const findItem = state.cartItems.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1
        })
      }

      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)

      if (state.cartItems.discount == 0 || null) {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      } else {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.DiscountProduct * obj.count + sum
        }, 0)
      }
    },
    plusItem(state, action) {
      const findItem = state.cartItems.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count++
      }

      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)

      if (state.cartItems.discount == 0 || null) {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      } else {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.DiscountProduct * obj.count + sum
        }, 0)
      }
    },
    minusItem(state, action) {
      const findItem = state.cartItems.find(obj => obj.id === action.payload)

      if (findItem) {
        if (findItem.count <= 1) {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        } else {
          findItem.count--
        }
      }

      if (state.cartItems.discount == 0 || null) {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.price * obj.count + sum
        }, 0)
      } else {
        state.totalPrice = state.cartItems.reduce((sum, obj) => {
          return obj.DiscountProduct * obj.count + sum
        }, 0)
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload)

      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    removeAll: (state, action) => {
      state.cartItems = [];

      state.totalPrice = 0;
    }, 
  },
})

export const { addToCart, plusItem, minusItem, removeFromCart, removeAll} = cartSlice.actions

export default cartSlice.reducer