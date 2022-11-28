import React, { useState, useEffect } from 'react'
// import './exports.scss'

import { connect } from 'react-redux'

import Search from '../../components/search/Search'
import RequestItem from '../../components/requestItem/RequestItem'
import List from '../../components/list/List'

import { setRequests } from '../../redux/components/requests/requestsSlice'

import { getAllSentRequests } from '../../functions/crud'

const Requests = ({ requests, setRequests }) => {
  const [search, setSearch] = useState('')

  const filteredItems =
    search.length === 0
      ? requests
      : requests.filter(
          (item) =>
            item.data.title.toLowerCase().includes(search.toLowerCase()) ||
            item.data.category.toLowerCase().includes(search.toLowerCase()) ||
            item.data.sku.toLowerCase().includes(search.toLowerCase())
        )

  useEffect(() => {
    getAllSentRequests()
      .then((res) => {
        console.log(res)
        setRequests(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="exports">
      <div className="exports__header">
        <div className="exports__title">Requests</div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="exports__info">
        <div className="exports__info__details">Product Details</div>
        <div>Category</div>
        <div>SKU</div>
        <div>Time</div>
        <div>Status</div>
      </div>

      <List
        items={filteredItems}
        Element={RequestItem}
        ElementProps={
          {
            // setToDeleteItem: setIsConfirmModalOpen,
          }
        }
        emptyMessage="No Exports"
        customOnClick={(id, isOpen) => {
          // setSpecificId(id)
          // setIsAddTagModalOpen(isOpen)
        }}
        offset={10.4}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  requests: state.requests,
})

const mapDispatchToProps = { setRequests }

export default connect(mapStateToProps, mapDispatchToProps)(Requests)
