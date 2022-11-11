import React, { useState } from 'react'
import './form-input.scss'

const FormField = ({
  id,
  label,
  placeholder,
  register,
  errors,
  Icon,
  Icon2,
  type,
  ...inputProps
}) => {
  const [passwordShown, setPasswordShown] = useState(false)

  return (
    <div className="input__group">
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        {...register(id, { required: true, minLength: 3 })}
        id={id}
        placeholder={placeholder}
        className="input__field input__field--normal"
        spellCheck="false"
        {...inputProps}
        autoComplete="false"
        onInvalid={(e) => e.preventDefault()}
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
      ) : (
        <Icon className="input__icon" />
      )}
    </div>
  )
}

export default FormField
