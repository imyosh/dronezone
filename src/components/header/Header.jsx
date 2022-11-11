import React from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from './logo.svg'

const Header = () => {
  return (
    <nav className="header">
      <div className="header__container">
        <Logo className="header__logo" /> DroneZone
      </div>
      <div>
        <NavLink className="header__item" to={'/contact'}>
          Contact Us
        </NavLink>
      </div>
    </nav>
  )
}

export default Header
