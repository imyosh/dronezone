import React from 'react'
import './exportItem.scss'

let colors = [
  '#FFE6AE',
  'rgb(255 220 241)',
  '#FFF1CB',
  '#E3FCEF',
  '#ECEDF2',
  '#D3ECFF',
]

const ExportItem = ({ item, index, setToDeleteItem }) => {
  return (
    <div className="exportItem">
      <div className="exportItem__info">
        <div
          style={{
            background: colors[index],
          }}
          className="exportItem__img__container"
        >
          <img className="exportItem__img" src={item.img} alt=""></img>
        </div>
        <div className="exportItem__info__group">
          <div className="exportItem__title">{item.title}</div>
          <div className="exportItem__subtitle">{item.subTitle}</div>
        </div>
      </div>

      <div className="exportItem__category">
        <div className="exportItem__category__item">{item.category}</div>
      </div>

      <div className="exportItem__item">{item.quantity}</div>
      <div className="exportItem__item">{item.sku}</div>
      <div className="exportItem__action">
        <div
          onClick={() => window.exportItem(item)}
          className="exportItem__action__item"
        >
          Edit
        </div>
        <div
          onClick={() => setToDeleteItem(item)}
          className="exportItem__action__item"
        >
          Delete
        </div>
      </div>
    </div>
  )
}

export default ExportItem
