import React from 'react'
import './login.scss'

import { ReactComponent as Stars } from '../../svg/stars.svg'
import { ReactComponent as Shaps } from '../../svg/shaps.svg'
import { ReactComponent as Illustration } from '../../svg/illustration.svg'

import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Eye } from '../../svg/eye.svg'
import { ReactComponent as EyeSalsh } from '../../svg/eye-slash.svg'
import { ReactComponent as Envelope } from '../../svg/envelope.svg'

import { useForm } from 'react-hook-form'

import FormField from '../../components/formInput/FormInput'

import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onLoginSubmit = handleSubmit((data, e) => {
    console.log(data)
  })

  return (
    <div className="login">
      <Stars className="landing__stars" />
      <Shaps className="landing__shaps" />
      <Illustration className="landing__illustration" />

      <div className="login__container">
        {/* <div className="login__switch">
          <div
            onClick={() => setIsSignIn(true)}
            className={`login__switch__item ${
              isSignIn ? 'login__switch__item--active' : ''
            }`}
          >
            Sign In
          </div>
          <div
            onClick={() => setIsSignIn(false)}
            className={`login__switch__item ${
              !isSignIn ? 'login__switch__item--active' : ''
            }`}
          >
            Sign Up
          </div>
        </div> */}

        <div className="landing__logo__container landing__logo__container--mob">
          <Logo className="landing__logo" /> DroneZone
        </div>

        <form className="login__form" onSubmit={onLoginSubmit}>
          <span className="login__form__title ">
            Log In
            <span className="login__form__title__dot">.</span>
          </span>

          <span className="login__form__subtitle">
            Don't have an account ?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="login__form__subtitle__login"
            >
              Sign Up
            </span>
          </span>

          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            Icon={Envelope}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            Icon={Eye}
            Icon2={EyeSalsh}
          />

          <button className="login__form__btn">Create Account</button>
        </form>

        <span className="login__form__subtitle login__form__subtitle--mob">
          Don't have an account ?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="login__form__subtitle__login"
          >
            Sign Up
          </span>
        </span>
      </div>
    </div>
  )
}

export default Login
