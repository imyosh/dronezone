import { createSlice } from '@reduxjs/toolkit'

const requestsSlice = createSlice({
  name: 'requests',
  initialState: [],
  reducers: {
    setRequests(state, action) {
      return action.payload
    },

    addExport(state, action) {
      state.push(action.payload)
    },

    deleteExport(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },
  },
})

// Export actions
export const { setRequests, addExport, deleteExport } = requestsSlice.actions

// Export reducer
export default requestsSlice.reducer
