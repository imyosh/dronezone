import React from 'react'
// import './login.scss'

import { ReactComponent as Stars } from '../../svg/stars.svg'
import { ReactComponent as Shaps } from '../../svg/shaps.svg'
import { ReactComponent as Illustration } from '../../svg/illustration.svg'

import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Eye } from '../../svg/eye.svg'
import { ReactComponent as EyeSalsh } from '../../svg/eye-slash.svg'
import { ReactComponent as Envelope } from '../../svg/envelope.svg'
import { ReactComponent as Postcard } from '../../svg/postcard.svg'

import { useForm } from 'react-hook-form'

import FormField from '../../components/formInput/FormInput'

import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSignUpSubmit = handleSubmit((data, e) => {
    console.log(data)
  })

  return (
    <div className="login">
      <Stars className="landing__stars" />
      <Shaps className="landing__shaps" />
      <Illustration className="landing__illustration" />

      <div className="login__container">
        <div className="landing__logo__container landing__logo__container--mob">
          <Logo className="landing__logo" /> DroneZone
        </div>

        <form className="login__form" onSubmit={onSignUpSubmit}>
          <span className="login__form__title">
            Create new acount
            <span className="login__form__title__dot">.</span>
          </span>
          <span className="login__form__subtitle">
            Already a member ?{' '}
            <span
              onClick={() => navigate('/login')}
              className="login__form__subtitle__login"
            >
              Log in
            </span>
          </span>
          <div className="login__group">
            <FormField
              id="firstName"
              label="First Name"
              register={register}
              errors={errors}
              Icon={Postcard}
            />

            <FormField
              id="lastName"
              label="Last Name"
              register={register}
              errors={errors}
              Icon={Postcard}
            />
          </div>

          <FormField
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            Icon={Envelope}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            Icon={Eye}
            Icon2={EyeSalsh}
          />

          <button className="login__form__btn">Create Account</button>
        </form>

        <span className="login__form__subtitle login__form__subtitle--mob">
          Already a member ?{' '}
          <span
            onClick={() => navigate('/login')}
            className="login__form__subtitle__login"
          >
            Log in
          </span>
        </span>
      </div>
    </div>
  )
}

export default SignUp
