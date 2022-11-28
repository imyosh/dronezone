import { createSlice } from '@reduxjs/toolkit'

const networkExports = createSlice({
  name: 'exports',
  initialState: [],
  reducers: {
    setNetworkExports(state, action) {
      return action.payload
    },

    decremntNetworkExport(state, action) {
      const exportItem = state.find((item) => item._id === action.payload._id)

      if (exportItem) {
        Object.assign(exportItem, {
          ...exportItem,
          quantity: --exportItem.quantity,
        })
      }
    },
  },
})

// Export actions
export const { setNetworkExports, decremntNetworkExport } =
  networkExports.actions

// Export reducer
export default networkExports.reducer
