import React, { useState } from 'react'
// import './login.scss'

import { ReactComponent as Stars } from '../../svg/stars.svg'
import { ReactComponent as Shaps } from '../../svg/shaps.svg'
import { ReactComponent as Illustration } from '../../svg/illustration.svg'

// import { ReactComponent as Logo } from '../../svg/logo.svg'
import { ReactComponent as Eye } from '../../svg/eye.svg'
import { ReactComponent as EyeSalsh } from '../../svg/eye-slash.svg'
import { ReactComponent as Envelope } from '../../svg/envelope.svg'
import { ReactComponent as Postcard } from '../../svg/postcard.svg'
import { ReactComponent as Network } from '../../svg/channel.svg'
import { ReactComponent as Map } from '../../svg/map.svg'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useNavigate } from 'react-router-dom'

import FormField from '../../components/formInput/FormInput'
import RadioInputGroup from '../../components/radioInputGroup/RadioInputGroup'

import axios from 'axios'

import RequstButton from '../../components/requestButton/RequstButton'

const schema1 = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    facilityName: yup.string().min(3).required(),
    stageLocation: yup
      .object({
        longitude: yup.number().required(),
        latitude: yup.number().required(),
      })
      .required(),
  })
  .required()

const schema2 = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    facilityName: yup.string().min(3).required(),
    networkId: yup.string().min(24).required(),
    stageLocation: yup
      .object({
        longitude: yup.number().required(),
        latitude: yup.number().required(),
      })
      .required(),
  })
  .required()

const SignUp = () => {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isPushing, setIspushing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema1),
  })

  const {
    register: register2,
    setValue: setValue2,
    formState: { errors: errors2 },
    clearErrors: clearErrors2,
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: yupResolver(schema2),
  })

  const getLocaiton = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        if (isAdmin) {
          setValue('stageLocation', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
          clearErrors('stageLocation')
        } else {
          setValue2('stageLocation', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          })
          clearErrors2('stageLocation')
        }
      },
      (err) => {
        console.log(err)
        window.notify()
      },
      {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      }
    )
  }

  const onSignUpSubmit = (data, e) => {
    console.log({
      ...data,
      isAdmin,
    })
    setIspushing(true)
    setIsSuccess(null)

    axios
      .post('/api/users/register', {
        ...data,
        isAdmin,
      })
      .then((res) => {
        console.log(res)
        setIspushing(false)
        setIsSuccess(true)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
        setIspushing(false)
        setIsSuccess(false)

        if (err.response.data.message)
          window.notify('Error', err.response.data.message)
        else window.notify()
      })
  }

  return (
    <div className="login">
      <Stars className="landing__stars" />
      <Shaps className="landing__shaps" />
      <Illustration className="landing__illustration" />

      <div className="login__container">
        {/* <div className="landing__logo__container landing__logo__container--mob">
          <Logo className="landing__logo" /> DroneZone
        </div> */}

        <form
          className="login__form"
          onSubmit={
            isAdmin
              ? handleSubmit(onSignUpSubmit)
              : handleSubmit2(onSignUpSubmit)
          }
        >
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
          <RadioInputGroup
            items={[
              { label: 'Network Member', value: false },
              { label: 'Network Admin', value: true },
            ]}
            onChange={(value) => setIsAdmin(value)}
          />

          {isAdmin ? (
            <>
              <FormField
                register={register('facilityName', { required: true })}
                id="facilityName"
                label="Facility Name"
                type="text"
                placeholder="Facility name"
                error={errors.facilityName}
                Icon={Postcard}
              />

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

              <div className="login__group">
                <FormField
                  register={register('stageLocation.longitude', {
                    required: true,
                  })}
                  id="longitude"
                  label="Stage Location"
                  type="text"
                  placeholder="Longitude"
                  error={
                    errors.stageLocation ? errors.stageLocation.longitude : null
                  }
                  // Icon={Postcard}
                />

                <FormField
                  register={register('stageLocation.latitude', {
                    required: true,
                  })}
                  id="latitude"
                  label=""
                  type="text"
                  placeholder="Latitude"
                  error={
                    errors.stageLocation ? errors.stageLocation.latitude : null
                  }
                  // Icon={Postcard}
                />

                <div onClick={getLocaiton} className="login__get">
                  Get
                  <Map className="login__get__icon" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="login__group">
                <FormField
                  register={register2('facilityName')}
                  id="facilityName"
                  label="Facility Name"
                  type="text"
                  placeholder="Facility name"
                  error={errors2.facilityName}
                  Icon={Postcard}
                />

                <FormField
                  register={register2('networkId')}
                  id="networkId"
                  label="Network Id"
                  type="text"
                  placeholder="ID"
                  error={errors2.networkId}
                  Icon={Network}
                />
              </div>

              <FormField
                register={register2('email', { required: true })}
                id="email"
                label="Email"
                type="text"
                placeholder="Enter your email"
                error={errors2.email}
                Icon={Envelope}
              />

              <FormField
                register={register2('password', { required: true })}
                id="password"
                label="Password"
                type="text"
                placeholder="Enter your password"
                error={errors2.password}
                Icon={Eye}
                Icon2={EyeSalsh}
              />

              <div className="login__group">
                <FormField
                  register={register2('stageLocation.longitude')}
                  id="longitude"
                  label="Stage Location"
                  type="text"
                  placeholder="Longitude"
                  error={
                    errors2.stageLocation
                      ? errors2.stageLocation.longitude
                      : null
                  }
                  // Icon={Postcard}
                />

                <FormField
                  register={register2('stageLocation.latitude')}
                  id="latitude"
                  label=""
                  type="text"
                  placeholder="Latitude"
                  error={
                    errors2.stageLocation
                      ? errors2.stageLocation.latitude
                      : null
                  }
                  // Icon={Postcard}
                />

                <div onClick={getLocaiton} className="login__get">
                  Get
                  <Map className="login__get__icon" />
                </div>
              </div>
            </>
          )}

          <RequstButton
            isLoading={isPushing}
            isSuccess={isSuccess}
            label="Create Account"
          />
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
