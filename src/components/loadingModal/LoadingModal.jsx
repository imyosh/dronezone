import React, { useState, useEffect } from 'react'
import './loadingModal.scss'

import Modal from '../modal/Modal'
import BoxesSpinner from '../spinners/BoxesSpinner'

const LoadingModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setDate] = useState({
    title: 'Error',
    message: 'Something went wrong.',
  })

  useEffect(() => {
    window.loading = (title, message) => {
      if (!title || !message)
        setDate({ title: 'Loading', message: 'Something getting done.' })
      else setDate({ title, message })
      setIsOpen(true)
    }

    window.finishLoading = () => {
      setIsOpen(false)
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isNotClosable={true}
    >
      <div className="modal__window loadingModal">
        <div className="loadingModal__title">{data.title}</div>
        <div className="loadingModal__message">{data.message}</div>

        <div className="loadingModal__spinner">
          <BoxesSpinner color="rgb(86 255 125)" />
        </div>

        {/* <div className='loadingModal__btns'>
          <div onClick={() => setIsOpen(false)} className='loadingModal__btn'>
            OK
          </div>
        </div> */}
      </div>
    </Modal>
  )
}

export default LoadingModal
