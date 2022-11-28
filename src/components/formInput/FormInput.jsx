import React, { useState } from 'react'
import './form-input.scss'

const FormField = ({
  id,
  label,
  placeholder,
  register,
  error,
  Icon,
  Icon2,
  type,
  ...inputProps
}) => {
  const [passwordShown, setPasswordShown] = useState(false)

  return (
    <div className={`input__group ${error && 'input--invaild'}`}>
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        {...register}
        id={id}
        placeholder={placeholder}
        className="input__field input__field--normal"
        spellCheck="false"
        {...inputProps}
        autoComplete="off"
        onInvalid={(e) => e.preventDefault()}
        type={type}
        {...(id === 'password'
          ? { type: passwordShown ? 'text' : 'password' }
          : {})}

        // type={passwordShown ? 'text' : 'password'}
      ></input>
      {id === 'password' ? (
        passwordShown ? (
          <Icon2
            onClick={() => {
              if (id === 'password') setPasswordShown(!passwordShown)
            }}
            className="input__icon input__icon--eye"
          />
        ) : (
          <Icon
            onClick={() => {
              setPasswordShown(!passwordShown)
            }}
            className="input__icon input__icon--eye"
          />
        )
      ) : Icon ? (
        <Icon className="input__icon" />
      ) : null}
    </div>
  )
}

export default FormField
