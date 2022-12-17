import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'

import { PersistGate } from 'redux-persist/integration/react'

import Axios from 'axios'

Axios.defaults.baseURL = 'https://dull-pink-turtle-hat.cyclic.app'
// Axios.defaults.baseURL = 'http://localhost:8868'

window.rr = () => store.getState()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // <React>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
