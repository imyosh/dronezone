import React from 'react'
import './node.scss'

import moment from 'moment'
import { connect } from 'react-redux'

import { deleteUser } from '../../functions/crud'
import { deleteNode } from '../../redux/components/admin/adminNodesSlice'

import { ReactComponent as Location } from '../../svg/location-point.svg'
import { ReactComponent as Clipboard } from '../../svg/clipboard-notes.svg'
import { ReactComponent as Trash } from '../../svg/trash.svg'
import { ReactComponent as Envelope } from '../../svg/envelope.svg'
import { ReactComponent as Estate } from '../../svg/estate.svg'
import { ReactComponent as Clock } from '../../svg/clock.svg'

const Node = ({ item, deleteNode }) => {
  if (!item) return
  return (
    <div className="node">
      <Estate className="node__icon" />

      <div className="node__info ">
        <div className="node__info__title">
          <Clipboard />
          {item.facilityName}
        </div>
        <div className="node__info__supplier">
          <Location />
          {`${item.stageLocation.latitude.toFixed(5)} /
                    ${item.stageLocation.longitude.toFixed(5)}`}
        </div>

        <div className="node__info__supplier">
          <Envelope />
          {item.email}
        </div>

        <div className="node__info__supplier">
          <Clock />
          {moment(item.createdAt).format('DD/MM/YYYY')}
        </div>
      </div>
      <div
        onClick={() =>
          window.testConfirm(
            'Remove Node',
            `Are you sure you want to remove ${item.facilityName} ?`,
            () => {
              deleteUser(item._id)
                .then((res) => {
                  console.log(res)
                  deleteNode(res.data.deletedUser)
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          )
        }
        className="node__btn"
      >
        <Trash className="node__btn__icon" />
        Remove
      </div>
    </div>
  )
}

const mapDispatchToProps = { deleteNode }

export default connect(null, mapDispatchToProps)(Node)
