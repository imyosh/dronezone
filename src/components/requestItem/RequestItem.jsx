import React from 'react'
import './requestItem.scss'

import moment from 'moment'

let colors = [
  '#FFE6AE',
  'rgb(255 220 241)',
  '#FFF1CB',
  '#E3FCEF',
  '#ECEDF2',
  '#D3ECFF',
]

const RequestItem = ({ item, index, setToDeleteItem }) => {
  return (
    <div className="requestItem" onClick={() => window.showItem(item, false)}>
      <div className="requestItem__info">
        <div
          style={{
            background: colors[index],
          }}
          className="requestItem__img__container"
        >
          <img className="requestItem__img" src={item.data.img} alt=""></img>
        </div>
        <div className="requestItem__info__group">
          <div className="requestItem__title">{item.data.title}</div>
          <div className="requestItem__subtitle">{item.data.subTitle}</div>
        </div>
      </div>

      <div className="requestItem__category">
        <div className="requestItem__category__item">{item.data.category}</div>
      </div>

      <div className="requestItem__item">{item.data.sku}</div>
      <div className="requestItem__item">
        {moment(item.createdAt).format('DD/MM/YY - hh:mm')}
      </div>
      <div
        className={`requestItem__item ${
          item.status === 'Processing'
            ? 'requestItem__item--yellow'
            : item.status === 'Delivered'
            ? 'requestItem__item--green'
            : item.status === 'Canceled'
            ? 'requestItem__item--red'
            : ''
        }`}
      >
        {item.status}
      </div>
    </div>
  )
}

export default RequestItem
