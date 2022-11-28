import React from 'react'
import './nav.scss'

import { NavLink } from 'react-router-dom'

import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Home } from '../../svg/home.svg'
import { ReactComponent as Dock } from '../../svg/dock.svg'
import { ReactComponent as Receipt } from '../../svg/receipt.svg'
import { ReactComponent as Send } from '../../svg/send.svg'
import { ReactComponent as Signout } from '../../svg/signout.svg'
import { ReactComponent as Admin } from '../../svg/user.svg'

import { connect } from 'react-redux'
import { setUser } from '../../redux/components/user/userSlice'

import { useNavigate } from 'react-router-dom'

const Nav = ({ setUser, facilityName, isAdmin }) => {
  const navigate = useNavigate()
  const logout = () => {
    window.testConfirm('Logout', 'Are you sure you want to log out ?', () => {
      setTimeout(() => {
        setUser(null)
        navigate('/login')
      }, 300)
    })
  }
  return (
    <div className="nav">
      <NavLink to={'/dashboard/home'} className="nav__logo">
        <div className="nav__logo__container">
          <Logo className="nav__logo__icon" /> DroneZone
        </div>
      </NavLink>

      <NavLink
        to={'/dashboard/home'}
        className={({ isActive }) =>
          isActive ? 'nav__item nav__item--active' : 'nav__item'
        }
      >
        <Home className="nav__item__icon" />
        <div>Home</div>
      </NavLink>

      <NavLink
        to={'/dashboard/requests'}
        className={({ isActive }) =>
          isActive ? 'nav__item nav__item--active' : 'nav__item'
        }
      >
        <Send className="nav__item__icon nav__item__icon--send" />
        <div>Requests</div>
      </NavLink>

      <NavLink
        to={'/dashboard/orders'}
        className={({ isActive }) =>
          isActive ? 'nav__item nav__item--active' : 'nav__item'
        }
      >
        <Receipt className="nav__item__icon" />
        <div>Orders</div>
      </NavLink>

      <NavLink
        to={'/dashboard/exports'}
        className={({ isActive }) =>
          isActive ? 'nav__item nav__item--active' : 'nav__item'
        }
      >
        <Dock className="nav__item__icon" />

        <div>Exports</div>
      </NavLink>

      <div className="nav__footer">
        {isAdmin ? (
          <NavLink
            to={'/dashboard/admin'}
            className={({ isActive }) =>
              isActive ? 'nav__item nav__item--active' : 'nav__item'
            }
          >
            <Admin className="nav__item__icon" />

            <div>Admin</div>
          </NavLink>
        ) : null}

        <div onClick={logout} className="nav__logout nav__item">
          <Signout className="nav__logout__icon" />
          Log out
        </div>
        <div className="nav__footer__name">{facilityName}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  facilityName: state.user.user.facilityName,
  isAdmin: state.user.user.isAdmin,
})

const mapDispatchToProps = { setUser }

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
