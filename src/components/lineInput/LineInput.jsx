import React, { forwardRef } from 'react'
import './lineInput.scss'

const LineInput = forwardRef((props, ref) => {
  return (
    <div className="lineInput">
      <input ref={ref} className="lineInput__input" {...props} />
      <label className="lineInput__label" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="lineInput__bar"></div>
    </div>
  )
})

export default LineInput
