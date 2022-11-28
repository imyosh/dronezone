import { createSlice } from '@reduxjs/toolkit'

const adminNodesSlice = createSlice({
  name: 'admin',
  initialState: [],
  reducers: {
    setAdminNodes(state, action) {
      return action.payload
    },

    deleteNode(state, action) {
      return state.filter((item) => item.id !== action.payload.id)
    },
  },
})

// Export actions
export const { setAdminNodes, deleteNode } = adminNodesSlice.actions

// Export reducer
export default adminNodesSlice.reducer
