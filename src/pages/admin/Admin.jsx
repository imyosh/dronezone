import React, { useState, useEffect } from 'react'
import './admin.scss'

import { connect } from 'react-redux'

import Search from '../../components/search/Search'
import Node from '../../components/node/Node'

import { getNetworkUsers } from '../../functions/crud'
import { setAdminNodes } from '../../redux/components/admin/adminNodesSlice'

const Admin = ({ networkNodes, setAdminNodes, networkId }) => {
  const [search, setSearch] = useState('')

  const filteredItems =
    search.length === 0
      ? networkNodes
      : networkNodes.filter(
          (item) =>
            item.facilityName.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase())
        )

  useEffect(() => {
    getNetworkUsers()
      .then((res) => {
        setAdminNodes(res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="admin">
      <div className="admin__header">
        <div className="admin__title">Network</div>
        <Search search={search} setSearch={setSearch} />
      </div>

      <div className="admin__id">ID : {networkId}</div>

      <div className="admin__items">
        {filteredItems.length !== 0 ? (
          filteredItems.map((item, id) => <Node key={id} item={item} />)
        ) : (
          <div className="admin__empty">No netowrk users yet</div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  networkNodes: state.admin,
  networkId: state.user.user.networkId,
})

const mapDispatchToProps = { setAdminNodes }

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
