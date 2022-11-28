import React, { useState, useEffect } from 'react'
import './infoModal.scss'

import Modal from '../modal/Modal'

import { ReactComponent as Location } from '../../svg/location-point.svg'
// import { ReactComponent as Map } from '../../svg/map.svg'
import { ReactComponent as Sku } from '../../svg/database.svg'
import { ReactComponent as Status } from '../../svg/package.svg'
import { ReactComponent as Estate } from '../../svg/estate.svg'

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOrder, setIsOrder] = useState(true)
  const [data, setDate] = useState({
    data: {},
    receiverData: { stageLocation: { latitude: 0, longitude: 0 } },
    senderData: { stageLocation: { latitude: 0, longitude: 0 } },
  })

  console.log(data)

  useEffect(() => {
    window.showItem = (data, isOrder) => {
      setDate(data)
      setIsOrder(isOrder)
      setIsOpen(true)
    }

    window.requestConfirm = () => {
      setIsOpen(false)
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
      }}
    >
      <div className="infoModal">
        <div className="infoModal__image">
          <img src={data.data.img} alt=""></img>
        </div>
        <div className="infoModal__info">
          <div className="infoModal__info__title">
            {data.data.title}
            <div className="infoModal__info__title__category">
              {data.data.category}
            </div>
          </div>
          <div className="infoModal__info__subtitle">{data.data.subTitle}</div>

          <div className="infoModal__info__item">
            <span className="infoModal__info__item__title">SKU </span>

            <div className="infoModal__info__group">
              <Sku className="infoModal__icon" />
              {data.data.sku}
            </div>
          </div>

          <div className="infoModal__info__item">
            <span className="infoModal__info__item__title">Status </span>
            <div
              className={`infoModal__info__group ${
                data.status === 'Processing'
                  ? 'exportItem__item--yellow'
                  : data.status === 'Delivered'
                  ? 'exportItem__item--green'
                  : data.status === 'Canceled'
                  ? 'exportItem__item--red'
                  : ''
              }`}
            >
              <Status className="infoModal__icon" />
              {data.status}
            </div>
          </div>

          <div className="infoModal__info__route">
            <div className="infoModal__info__route__group">
              <Estate className="infoModal__info__route__icon" />
              <div className="infoModal__info__group">
                {isOrder
                  ? data.senderData.facilityName
                  : data.receiverData.facilityName}
              </div>

              <div className="infoModal__info__group">
                {isOrder
                  ? `${data.senderData.stageLocation.latitude.toFixed(5)} /
                    ${data.senderData.stageLocation.longitude.toFixed(5)}`
                  : `${data.receiverData.stageLocation.latitude.toFixed(5)} /
                  ${data.receiverData.stageLocation.longitude.toFixed(5)}`}
              </div>
            </div>

            <div
              className={`infoModal__info__route__shape ${
                data.status === 'Processing'
                  ? 'infoModal__info__route__shape--processing'
                  : data.status === 'Delivered'
                  ? 'infoModal__info__route__shape--delivered'
                  : data.status === 'Canceled'
                  ? 'infoModal__info__route__shape--canceled'
                  : ''
              }`}
            >
              <div className="infoModal__info__route__shape__indicator"></div>
              <Location className="infoModal__info__route__shape__icon" />
            </div>

            <div className="infoModal__info__route__group">
              <Estate className="infoModal__info__route__icon" />
              <div className="infoModal__info__group">
                {isOrder
                  ? data.receiverData.facilityName
                  : data.senderData.facilityName}
              </div>

              <div className="infoModal__info__group">
                {isOrder
                  ? `${data.receiverData.stageLocation.latitude.toFixed(5)} /
                    ${data.receiverData.stageLocation.longitude.toFixed(5)}`
                  : `${data.senderData.stageLocation.latitude.toFixed(5)} /
                  ${data.senderData.stageLocation.longitude.toFixed(5)}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default InfoModal
