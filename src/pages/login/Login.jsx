import React, { useState, useRef, useEffect } from 'react'
import './login.scss'

import { useSignIn, useIsAuthenticated } from 'react-auth-kit'

import { ReactComponent as Stars } from '../../svg/stars.svg'
import { ReactComponent as Shaps } from '../../svg/shaps.svg'
import { ReactComponent as Illustration } from '../../svg/illustration.svg'

import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Eye } from '../../svg/eye.svg'
import { ReactComponent as EyeSalsh } from '../../svg/eye-slash.svg'
import { ReactComponent as Envelope } from '../../svg/envelope.svg'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../redux/components/user/userSlice'

import FormField from '../../components/formInput/FormInput'
import RequstButton from '../../components/requestButton/RequstButton'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required()

const Login = ({ setUser }) => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('user is authenticatedddddddd')
      // Redirect to Dashboard
      navigate('/dashboard/home')
    } else {
      // Redirect to Login
      console.log('user is not authenticated')
    }
  }, [])

  const [isPushing, setIspushing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)
  const errorRef = useRef(null)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onLoginSubmit = handleSubmit((data, e) => {
    console.log(data)

    setIspushing(true)
    setIsSuccess(null)

    axios
      .post('/api/users/login', data)
      .then((res) => {
        console.log(res)

        if (
          signIn({
            token: res.data.token,
            expiresIn: 30,
            tokenType: 'string',
            authState: res.data,
            // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
            // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
          })
        ) {
          // Only if you are using refreshToken feature
          // Redirect or do-something

          setUser(res.data)
          setIspushing(false)
          setIsSuccess(true)
          navigate('/dashboard/home')
        } else {
          //Throw error
          window.notify()
        }
      })
      .catch((err) => {
        console.log(err)
        setIspushing(false)
        setIsSuccess(false)
        errorRef.current.classList.add('login__error--show')
        setTimeout(() => {
          errorRef.current.classList.remove('login__error--show')
        }, 3000)
      })
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
            register={register('email', { required: true })}
            id="email"
            label="Email"
            type="text"
            placeholder="Enter your email"
            error={errors.email}
            Icon={Envelope}
          />

          <FormField
            register={register('password', { required: true })}
            id="password"
            label="Password"
            type="text"
            placeholder="Enter your password"
            error={errors.password}
            Icon={Eye}
            Icon2={EyeSalsh}
          />

          <RequstButton
            isLoading={isPushing}
            isSuccess={isSuccess}
            label="Log In"
          />
          <div ref={errorRef} className="login__error">
            Invalid email or password
          </div>
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

const mapDispatchToProps = { setUser }

export default connect(null, mapDispatchToProps)(Login)
