import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import NotifyModal from './components/notifiyModal/NotifyModal'
import LoadingModal from './components/loadingModal/LoadingModal'
import RequestModal from './components/requestModal/RequestModal'
import ConfirmModal from './components/confrimModal/ConfirmModal'
import InfoModal from './components/infoModal/infoModal'

import Landing from './pages/landing/Landing'
import Login from './pages/login/Login'
import SignUp from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NotifyModal />
        <LoadingModal />
        <ConfirmModal />
        <RequestModal />
        <InfoModal />
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/dashboard/*" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
