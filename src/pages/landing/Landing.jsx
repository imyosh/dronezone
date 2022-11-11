import React from 'react'
import './landing.scss'
// import { ReactComponent as Icon } from './drone.svg'

import { ReactComponent as Stars } from '../../svg/stars.svg'
import { ReactComponent as Shaps } from '../../svg/shaps.svg'
import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Plane } from '../../svg/plane-fly.svg'
import { ReactComponent as Illustration } from '../../svg/illustration.svg'

import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <Stars className="landing__stars" />
      <Shaps className="landing__shaps" />
      <Illustration className="landing__illustration" />

      <div className="landing__about">
        <div className="landing__about__head">Ship With</div>
        <div className="landing__logo__container">
          <Logo className="landing__logo" /> DroneZone
        </div>
        <div className="landing__about__description">
          Deliver your packages using a network of autonomous drones for faster
          and safer point to point shipping.
        </div>

        <div onClick={() => navigate('/login')} className="landing__about__btn">
          <div className="landing__about__btn__c">
            <Plane className="landing__about__btn__c__icon" />
          </div>
          Get Started
        </div>
      </div>
    </div>
  )
}

export default Landing
