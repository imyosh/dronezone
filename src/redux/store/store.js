import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../components/user/userSlice'
import exportsSlice from '../components/exports/exportsSlice'
import requestsSlice from '../components/requests/requestsSlice'
import ordersSlice from '../components/orders/ordersSlice'
import networkExportsSlice from '../components/networkExports/networkExportsSlice'
import projectsReducer from '../components/projects/projectsSlice'
import adminNodesSlice from '../components/admin/adminNodesSlice'

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    exports: exportsSlice,
    requests: requestsSlice,
    orders: ordersSlice,
    networkExports: networkExportsSlice,
    projects: projectsReducer,
    admin: adminNodesSlice,
  }),
})
