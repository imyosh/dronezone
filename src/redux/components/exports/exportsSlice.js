import { createSlice } from '@reduxjs/toolkit'

const exportsSlice = createSlice({
  name: 'exports',
  initialState: [],
  reducers: {
    setExports(state, action) {
      return action.payload
    },

    addExport(state, action) {
      state.push(action.payload)
    },

    deleteExport(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },

    updateExport(state, action) {
      const exportItem = state.find((item) => item._id === action.payload._id)

      if (exportItem) {
        Object.assign(exportItem, { ...exportItem, ...action.payload })
      }
    },
  },
})

// Export actions
export const { setExports, addExport, deleteExport, updateExport } =
  exportsSlice.actions

// Export reducer
export default exportsSlice.reducer
