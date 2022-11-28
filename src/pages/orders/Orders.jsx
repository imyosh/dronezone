import React, { useState, useEffect } from 'react'
import './orders.scss'

import { connect } from 'react-redux'

import Search from '../../components/search/Search'
import ExportItemModal from '../../components/exportItemModal/ExportItemModal'
import OrderItem from '../../components/orderItem/OrderItem'
import List from '../../components/list/List'

import { setOrders } from '../../redux/components/orders/ordersSlice'

import { getAllReceivedRequests } from '../../functions/crud'

const Orders = ({ orders, setOrders }) => {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredItems =
    search.length === 0
      ? orders
      : orders.filter(
          (item) =>
            item.data.title.toLowerCase().includes(search.toLowerCase()) ||
            item.data.category.toLowerCase().includes(search.toLowerCase()) ||
            item.data.sku.toLowerCase().includes(search.toLowerCase())
        )

  useEffect(() => {
    getAllReceivedRequests()
      .then((res) => {
        console.log(res)
        setOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [setOrders])

  return (
    <div className="orders">
      <div className="orders__header">
        <div className="orders__title">Orders</div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="orders__info">
        <div className="orders__info__details">Product Details</div>
        <div>Category</div>
        <div>SKU</div>
        <div>Time</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      <List
        items={filteredItems}
        Element={OrderItem}
        ElementProps={{}}
        emptyMessage="No Orders"
        customOnClick={(id, isOpen) => {
          // setSpecificId(id)
          // setIsAddTagModalOpen(isOpen)
        }}
        offset={10.4}
      />

      <ExportItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  orders: state.orders,
})

const mapDispatchToProps = { setOrders }

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
