import axios from 'axios'
import { store } from '../redux/store/store'

export const addExportToNetwork = (exportData) => {
  const {
    token,
    user: { networkId, facilityName, stageLocation },
  } = store.getState().user

  return axios.post(
    `/api/networks/addExport/${networkId}`,
    { ...exportData, senderData: { facilityName, stageLocation } },
    {
      headers: {
        'x-access-token': token,
      },
    }
  )
}

/////////////////////////////

export const deleteExportFromNetwork = (exportData) => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.post(`/api/networks/deleteExport/${networkId}`, exportData, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const updateExportInNetwork = (exportData) => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  console.log('crud')

  return axios.post(`/api/networks/updateExport/${networkId}`, exportData, {
    headers: {
      'x-access-token': token,
    },
  })
}

export const getNetworkExports = () => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.get(`/api/networks/getExports/${networkId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const getNetworkUsers = () => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.get(`/api/networks/getNetworkUsers/${networkId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const getUserExports = () => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.get(`/api/users/getExports/${networkId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const deleteUser = (userId) => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.delete(`/api/users/delete/${networkId}/${userId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const requestExport = (item) => {
  const {
    token,
    user: { networkId, facilityName, stageLocation },
  } = store.getState().user

  console.log({ ...item, receiverData: { facilityName, stageLocation } })

  return axios.post(
    `/api/users/requestExport/${networkId}`,
    { ...item, receiverData: { facilityName, stageLocation } },
    {
      headers: {
        'x-access-token': token,
      },
    }
  )
}

/////////////////////////////

export const getAllSentRequests = () => {
  const {
    token,
    user: { networkId },
  } = store.getState().user
  return axios.get(`/api/users/getAllSentRequests/${networkId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const getAllReceivedRequests = () => {
  const {
    token,
    user: { networkId },
  } = store.getState().user
  return axios.get(`/api/users/getAllReceivedRequests/${networkId}`, {
    headers: {
      'x-access-token': token,
    },
  })
}

/////////////////////////////

export const updateRequstStatus = (status, requestId, exportId) => {
  const {
    token,
    user: { networkId },
  } = store.getState().user

  return axios.post(
    '/api/users/updateRequstStatus/',
    { status, requestId, exportId, networkId },
    {
      headers: {
        'x-access-token': token,
      },
    }
  )
}
