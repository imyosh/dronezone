import React, { useState, useEffect } from 'react'
import './home.scss'

import { getNetworkExports } from '../../functions/crud'

import Item from '../../components/item/Item'
import Search from '../../components/search/Search'

import { connect } from 'react-redux'
import { setNetworkExports } from '../../redux/components/networkExports/networkExportsSlice'
// import {}

// let items = require('./data.json')

const Home = ({ networkExports, setNetworkExports }) => {
  const [search, setSearch] = useState('')

  const filteredItems =
    search.length === 0
      ? networkExports
      : networkExports.filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.sku.toLowerCase().includes(search.toLowerCase())
        )

  useEffect(() => {
    getNetworkExports().then((res) => {
      console.log(res)
      setNetworkExports(res.data)
    })
  }, [])

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__title">Request an Item</div>
        <Search search={search} setSearch={setSearch} />
        <div className="home__header__btn">Filter</div>
      </div>

      <div className="home__items">
        {filteredItems.length !== 0 ? (
          filteredItems.map((item, id) => <Item key={id} item={item} />)
        ) : (
          <div className="home__empty">No netowrk exports yet</div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  networkExports: state.networkExports,
})

const mapDispatchToProps = { setNetworkExports }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
