import React, { useEffect } from 'react'
import './dashboard.scss'

import { Routes, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Nav from '../../components/nav/Nav'
import Home from '../home/Home'
import Requests from '../requests/Requests'
import Exports from '../export/Exports'
import Orders from '../orders/Orders'
import Admin from '../admin/Admin'

import { useNavigate } from 'react-router-dom'

const Dashboard = ({ user }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="dashboard">
      <Nav />
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="requests" element={<Requests />}></Route>
        <Route path="exports" element={<Exports />}></Route>
        <Route path="orders" element={<Orders />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Dashboard)
