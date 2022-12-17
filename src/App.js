import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, RequireAuth } from 'react-auth-kit'

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
      <AuthProvider
        authType="cookie"
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === 'https:'}
      >
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
            <Route
              path="/dashboard/*"
              element={
                <RequireAuth loginPath={'/login'}>
                  <Dashboard />
                </RequireAuth>
              }
            ></Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
