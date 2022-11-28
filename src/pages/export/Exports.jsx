import React, { useState, useEffect } from 'react'
import './exports.scss'

import { connect } from 'react-redux'

import Search from '../../components/search/Search'
import ExportItem from '../../components/exportItem/ExportItem'
import List from '../../components/list/List'

import {
  setExports,
  deleteExport,
} from '../../redux/components/exports/exportsSlice'

import { getUserExports, deleteExportFromNetwork } from '../../functions/crud'

import ExportItemModal from '../../components/exportItemModal/ExportItemModal'

const Exports = ({ exports, setExports, deleteExport }) => {
  const [search, setSearch] = useState('')

  const filteredItems =
    search.length === 0
      ? exports
      : exports.filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        )

  useEffect(() => {
    console.log('send request')
    getUserExports()
      .then((res) => {
        console.log(res)

        setExports(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="exports">
      <div className="exports__header">
        <div className="exports__title">Exports</div>
        <Search search={search} setSearch={setSearch} />
        <div onClick={() => window.exportItem()} className="exports__btn">
          Export Item
        </div>
      </div>

      <div className="exports__info">
        <div className="exports__info__details">Product Details</div>
        <div>Category</div>
        <div>Quanitiy</div>
        <div>SKU</div>
        <div>Actions</div>
      </div>

      <List
        items={filteredItems}
        Element={ExportItem}
        ElementProps={{
          setToDeleteItem: (item) =>
            window.testConfirm(
              'Delete Export',
              'Are you sure you want to delete this export ?',
              () => {
                deleteExportFromNetwork(item)
                  .then((res) => {
                    console.log(res)
                    deleteExport(item)
                  })
                  .catch((err) => {
                    console.log(err)
                    window.notify()
                  })
              }
            ),
        }}
        emptyMessage="No Exports"
        offset={10.4}
      />
      <ExportItemModal />
    </div>
  )
}

const mapStateToProps = (state) => ({
  exports: state.exports,
})

const mapDispatchToProps = { setExports, deleteExport }

export default connect(mapStateToProps, mapDispatchToProps)(Exports)
