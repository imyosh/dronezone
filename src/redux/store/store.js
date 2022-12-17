import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../components/user/userSlice'
import exportsSlice from '../components/exports/exportsSlice'
import requestsSlice from '../components/requests/requestsSlice'
import ordersSlice from '../components/orders/ordersSlice'
import networkExportsSlice from '../components/networkExports/networkExportsSlice'
import projectsReducer from '../components/projects/projectsSlice'
import adminNodesSlice from '../components/admin/adminNodesSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    exports: exportsSlice,
    requests: requestsSlice,
    orders: ordersSlice,
    networkExports: networkExportsSlice,
    projects: projectsReducer,
    admin: adminNodesSlice,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
})

export let persistor = persistStore(store)
