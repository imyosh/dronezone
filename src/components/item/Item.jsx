import React from 'react'
import './item.scss'

import { ReactComponent as Location } from '../../svg/location-point.svg'
import { ReactComponent as Clipboard } from '../../svg/clipboard-notes.svg'
import { ReactComponent as Box } from '../../svg/box.svg'

const Item = ({ item }) => {
  if (!item) return
  return (
    <div className="item">
      <div className="item__img__container">
        <img className="item__img" src={item ? item.img : null} alt="" />
      </div>

      <div className="item__info ">
        <div className="item__info__title">
          <Clipboard />
          {item.title}
        </div>
        <div className="item__info__supplier">
          <Location />
          {item.senderData.facilityName}
        </div>

        {item.quantity !== 0 ? (
          <div className="item__info__instock">
            <Box />
            In Stock ({item.quantity})
          </div>
        ) : (
          <div className="item__info__outstock">
            <Box />
            Out Of Stock
          </div>
        )}
      </div>
      <div
        onClick={() => window.requestItem(item)}
        className={`item__btn ${item.quantity !== 0 ? '' : 'disable'}`}
      >
        Request
      </div>
    </div>
  )
}

export default Item
