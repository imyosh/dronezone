import React from 'react'
import './radioInputGroup.scss'

const RadioInputGroup = ({ items, onChange }) => {
  return (
    <div className="radioInputGroup">
      {items.map((item, i) => (
        <label key={i}>
          <input
            onChange={(e) => onChange(item.value)}
            type="radio"
            name="radio"
            defaultChecked={i === 0 ? true : false}
          />
          <div className="box">{item.label}</div>
        </label>
      ))}
    </div>
  )
}

export default RadioInputGroup
