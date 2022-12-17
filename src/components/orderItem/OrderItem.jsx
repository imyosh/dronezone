import React from 'react'
import './orderItem.scss'

import moment from 'moment'

import { updateRequstStatus } from '../../functions/crud'
import { updateOrder } from '../../redux/components/orders/ordersSlice'
import { connect } from 'react-redux'

import { getColor } from '../../functions'

const OrderItem = ({ item, index, updateOrder }) => {
  return (
    <div onClick={() => window.showItem(item, true)} className="orderItem">
      <div className="orderItem__info">
        <div
          style={{
            background: getColor(index),
          }}
          className="orderItem__img__container"
        >
          <img className="orderItem__img" src={item.data.img} alt=""></img>
        </div>
        <div className="orderItem__info__group">
          <div className="orderItem__title">{item.data.title}</div>
          <div className="orderItem__subtitle">{item.data.subTitle}</div>
        </div>
      </div>

      <div className="orderItem__category">
        <div className="orderItem__category__item">{item.data.category}</div>
      </div>

      <div className="orderItem__item">{item.data.sku}</div>

      <div className="orderItem__item">
        <div className="orderItem__time">
          {moment(item.createdAt).format('DD/MM/YY - hh:mm')}
        </div>
      </div>
      <div
        className={`orderItem__item ${
          item.status === 'Processing'
            ? 'orderItem__item--yellow'
            : item.status === 'Shipping'
            ? 'orderItem__item--blue'
            : item.status === 'Delivered'
            ? 'orderItem__item--green'
            : item.status === 'Canceled'
            ? 'orderItem__item--red'
            : ''
        }`}
      >
        {item.status}
      </div>

      <div className="orderItem__action">
        {item.status === 'Pending' ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
              window.testConfirm(
                'Fullfilling order',
                'Start fullfilling the order ?',
                () => {
                  console.log('update')
                  updateRequstStatus('Processing', item._id, item.data._id)
                    .then((res) => {
                      console.log(res)
                      updateOrder(res.data)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                },
                'green'
              )
            }}
            className="orderItem__action__item"
          >
            Start Fulfilling
          </div>
        ) : item.status === 'Delivered' || item.status === 'Canceled' ? null : (
          <>
            {item.status === 'Processing' ? (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.testConfirm(
                    'Delivere order',
                    'Mark the order as Shipping ?',
                    () => {
                      console.log('update')
                      updateRequstStatus('Shipping', item._id, item.data._id)
                        .then((res) => {
                          console.log(res)
                          updateOrder(res.data)
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    },
                    'green'
                  )
                }}
                className="orderItem__action__item"
              >
                Shipping
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  window.testConfirm(
                    'Delivere order',
                    'Mark the order as Delivered ?',
                    () => {
                      console.log('update')
                      updateRequstStatus('Delivered', item._id, item.data._id)
                        .then((res) => {
                          console.log(res)
                          updateOrder(res.data)
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    },
                    'green'
                  )
                }}
                className="orderItem__action__item"
              >
                Complete
              </div>
            )}

            <div
              onClick={(e) => {
                e.stopPropagation()
                window.testConfirm(
                  'Cancele order',
                  'Are you sure you want to cancel this order ?',
                  () => {
                    console.log('update')
                    updateRequstStatus('Canceled', item._id, item.data._id)
                      .then((res) => {
                        console.log(res)
                        updateOrder(res.data)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }
                )
                window.testConfirm(
                  'Cancele order',
                  'Are you sure you want to cancel this order ?',
                  () => {
                    console.log('update')
                    updateRequstStatus('Canceled', item._id, item.data._id)
                      .then((res) => {
                        console.log(res)
                        updateOrder(res.data)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  }
                )
              }}
              className="orderItem__action__item"
            >
              Cancele
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const mapDispatchToProps = { updateOrder }
export default connect(null, mapDispatchToProps)(OrderItem)
