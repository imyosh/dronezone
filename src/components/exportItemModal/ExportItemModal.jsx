import React, { useState, useEffect } from 'react'
import './exportItemModal.scss'

import Modal from '../modal/Modal'
import LineInput from '../lineInput/LineInput'

import { ReactComponent as AddIcon } from '../../svg/plus.svg'
import { ReactComponent as SaveIcon } from '../../svg/save.svg'

import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import { getBase64 } from '../../functions'
import {
  addExport,
  updateExport,
} from '../../redux/components/exports/exportsSlice'

import { addExportToNetwork, updateExportInNetwork } from '../../functions/crud'

const ExportItemModal = ({ addExport, updateExport }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [toEditExport, setToEditExport] = useState(null)
  const [selectedImg, setSelectedImg] = useState(null)

  const onChangeImg = (event) => {
    const file = event.target.files[0]
    getBase64(file, (base64) => {
      setSelectedImg(base64)
    })
  }

  // initialization of the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    if (toEditExport) {
      console.log('to update', data)
      updateExportInNetwork({
        ...data,
        quantity: Number(data.quantity),
        img: selectedImg,
      })
        .then((res) => {
          console.log(res)
          updateExport(res.data)
        })
        .catch((err) => console.log(err))
      setToEditExport(null)
    } else {
      window.loading('Export Item', 'Adding an item to the network.')
      addExportToNetwork({
        ...data,
        quantity: Number(data.quantity),
        img: selectedImg,
      })
        .then((res) => {
          console.log(res)
          addExport(res.data)
          window.finishLoading()
        })
        .catch((err) => {
          console.log(err)
          window.notify()
        })
    }

    // close and reset the form
    setTimeout(() => {
      reset({})
      setSelectedImg(null)
    }, 300)
    setToEditExport(null)
    setIsOpen(false)
  })

  useEffect(() => {
    window.exportItem = (toEditExportData) => {
      console.log('open', toEditExportData)
      if (toEditExportData) {
        reset(toEditExportData)
        setSelectedImg(toEditExportData.img)
        setToEditExport(toEditExportData)
      } else {
        reset({})
        setSelectedImg(null)
        setToEditExport(null)
      }
      setIsOpen(true)
    }
  }, [reset])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={onSubmit} className="exportItemModal">
        <div className="exportItemModal__title__group">
          <h1 className="exportItemModal__title">
            {toEditExport ? 'Edit Item' : 'Export New Item'}
          </h1>
        </div>

        <div className="exportItemModal__fields">
          <LineInput
            {...register('title', {
              required: true,
              minLength: 3,
              maxLength: 35,
            })}
            id="title"
            type="text"
            placeholder="h"
            label="Title"
          />

          <LineInput
            {...register('subTitle', {
              required: true,
              minLength: 3,
            })}
            id="subTitle"
            type="text"
            placeholder="h"
            label="Sub Title"
          />

          <LineInput
            {...register('category', {
              required: true,
              minLength: 3,
              maxLength: 35,
            })}
            id="category"
            type="text"
            placeholder="h"
            label="Category"
          />

          <LineInput
            {...register('quantity', {
              required: true,
              min: 0,
            })}
            id="quantity"
            type="number"
            placeholder="h"
            label="Quantity"
          />

          <div
            onClick={() => document.getElementById('image-input').click()}
            className="exportItemModal__image"
            style={{
              background: errors.img ? 'rgb(255 159 159)' : '#161822',
            }}
          >
            <input
              {...register('img', {
                required: !toEditExport,
                onChange: onChangeImg,
              })}
              style={{ display: 'none' }}
              type="file"
              accept=".jpg, .png, .jpeg"
              id="image-input"
            />
            {selectedImg ? <img src={selectedImg} alt=""></img> : 'Add Image'}
          </div>
        </div>

        <button className="exportItemModal__btn">
          {toEditExport ? <SaveIcon /> : <AddIcon />}
        </button>
      </form>
    </Modal>
  )
}

const mapDispatchToProps = { addExport, updateExport }

export default connect(null, mapDispatchToProps)(ExportItemModal)
