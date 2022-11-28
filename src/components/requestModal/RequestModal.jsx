import React, { useState, useEffect } from 'react'
import './requestModal.scss'

import Modal from '../modal/Modal'

import { ReactComponent as Location } from '../../svg/location-point.svg'
import { ReactComponent as Map } from '../../svg/map.svg'
import { ReactComponent as Sku } from '../../svg/database.svg'

import RequstButton from '../requestButton/RequstButton'

import { requestExport } from '../../functions/crud'

import { decremntNetworkExport } from '../../redux/components/networkExports/networkExportsSlice'

import { connect } from 'react-redux'

const RequestModal = ({ decremntNetworkExport }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setDate] = useState({
    senderData: { stageLocation: { longitude: 0, latitude: 0 } },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(null)

  const requestItem = () => {
    setIsLoading(true)
    setIsSuccess(null)

    requestExport({
      sender_id: data.ownerId,
      export_id: data._id,
      senderData: data.senderData,
    })
      .then((res) => {
        setIsLoading(false)
        setIsSuccess(true)
        console.log(res)
        decremntNetworkExport(data)
        setTimeout(() => {
          setIsOpen(false)
          setIsSuccess(null)
        }, 1500)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsSuccess(false)
        console.log(err)
        setTimeout(() => {
          setIsSuccess(null)
        }, 1500)
      })
  }

  useEffect(() => {
    window.requestItem = (data) => {
      setDate(data)
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
        setIsSuccess(null)
      }}
    >
      <div className="requestModal">
        <div className="requestModal__image">
          <img src={data.img} alt=""></img>
        </div>
        <div className="requestModal__info">
          <div className="requestModal__info__title">
            {data.title}
            <div className="requestModal__info__title__category">
              {data.category}
            </div>
          </div>
          <div className="requestModal__info__subtitle">{data.subTitle}</div>
          <div className="requestModal__info__item">
            <span className="requestModal__info__item__title">Suplier :</span>

            <div className="requestModal__info__group">
              <Location className="requestModal__icon" />
              {data.senderData.facilityName}
            </div>
          </div>

          <div className="requestModal__info__item">
            <span className="requestModal__info__item__title">SKU :</span>

            <div className="requestModal__info__group">
              <Sku className="requestModal__icon" />
              {data.sku}
            </div>
          </div>

          <div className="requestModal__info__item">
            <span className="requestModal__info__item__title">GPS :</span>

            <div className="requestModal__info__group">
              <Map className="requestModal__icon" />
              {`${data.senderData.stageLocation.latitude.toFixed(5)} /
                  ${data.senderData.stageLocation.longitude.toFixed(5)}`}
            </div>
          </div>

          <RequstButton
            onClick={requestItem}
            label="Confrim"
            className="requestModal__info__btn"
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </div>
      </div>
    </Modal>
  )
}

const mapDispatchToProps = { decremntNetworkExport }

export default connect(null, mapDispatchToProps)(RequestModal)
