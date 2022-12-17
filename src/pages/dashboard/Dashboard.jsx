import React from 'react'
import './dashboard.scss'

import { useAuthUser } from 'react-auth-kit'

import { Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import Nav from '../../components/nav/Nav'
import Home from '../home/Home'
import Requests from '../requests/Requests'
import Exports from '../export/Exports'
import Orders from '../orders/Orders'
import Admin from '../admin/Admin'

import { setUser } from '../../redux/components/user/userSlice'

// import { useNavigate } from 'react-router-dom'

const Dashboard = ({ setUser }) => {
  const auth = useAuthUser()
  console.log('setting user')
  setUser(auth())

  return (
    <div className="dashboard">
      <Nav />
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="requests" element={<Requests />}></Route>
        <Route path="exports" element={<Exports />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="admin" element={<Admin />}></Route>

        <Route path="*" element={<Navigate to="/dashboard/home" />} />
      </Routes>
    </div>
  )
}

const mapDispatchToProps = { setUser }

export default connect(null, mapDispatchToProps)(Dashboard)
