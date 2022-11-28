import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import { store } from './redux/store/store'

import Axios from 'axios'

// Axios.defaults.baseURL = 'http://18.117.221.18:8080'
Axios.defaults.baseURL = 'http://localhost:8868'

window.rr = () => store.getState()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React>
  <Provider store={store}>
    <App />
  </Provider>
  // </React>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
