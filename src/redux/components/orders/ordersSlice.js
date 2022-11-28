import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    setOrders(state, action) {
      return action.payload
    },

    updateOrder(state, action) {
      let order = state.find((order) => order._id === action.payload._id)
      if (order) {
        Object.assign(order, { ...order, ...action.payload })
      }
    },
  },
})

// Export actions
export const { setOrders, updateOrder } = ordersSlice.actions

// Export reducer
export default ordersSlice.reducer
