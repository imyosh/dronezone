import React, { useState, useEffect } from 'react'
import './confirmModal.scss'
import Modal from '../modal/Modal'

const ConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setDate] = useState({
    title: 'Confirm',
    message: 'Are you sure you want to do this ?',
    onConfirm: () => {},
    color: 'red',
  })

  useEffect(() => {
    window.testConfirm = (title, message, onConfirm, color) => {
      if (!title || !message || !onConfirm)
        setDate({
          title: 'Confirm',
          message: 'Are you sure you want to do this ?',
          onConfirm: () => {},
          color: 'red',
        })
      else setDate({ title, message, onConfirm, color })
      setIsOpen(true)
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="modal__window confirmModal">
        <div className="confirmModal__title">{data.title}</div>
        <div className="confirmModal__message">{data.message}</div>
        <div className="confirmModal__btns">
          <div
            onClick={() => {
              data.onConfirm()
              setIsOpen(false)
            }}
            className={`confirmModal__btn ${
              data.color
                ? data.color === 'red'
                  ? ''
                  : 'confirmModal__btn--green'
                : ''
            }`}
          >
            Confirm
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
