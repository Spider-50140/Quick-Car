import axios from 'axios'
import { message } from 'antd'

export const getcardata = () => (dispatch) => {
  dispatch({ type: 'loading', payload: true })
  axios
    .get('/api/cars/getcars')
    .then((res) => {
      dispatch({ type: 'getallcars', payload: res.data })
      dispatch({ type: 'loading', payload: false })
    })
    .catch((err) => {
      console.log(err)
      dispatch({ type: 'loading', payload: false })
    })
}
// const getcardata = () => async (dispatch) => {
//   dispatch({ type: 'loading', payload: true })
//   try {
//     const response = await axios.get(' /api/cars/getcars')
//     dispatch({ type: 'getallcars', payload: response.data })
//     dispatch({ type: 'loading', payload: false })
//   } catch (error) {
//     console.log(error)
//     dispatch({ type: 'loading', payload: false })
//   }
// }
export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'loading', payload: true })

  try {
    await axios.post('/api/cars/addcar', reqObj)

    dispatch({ type: 'loading', payload: false })
    message.success('New car added successfully')
    setTimeout(() => {
      window.location.href = '/admin'
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'loading', payload: false })
  }
}

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'loading', payload: true })

  try {
    await axios.post('/api/cars/editcar', reqObj)

    dispatch({ type: 'loading', payload: false })
    message.success('Car details updated successfully')
    setTimeout(() => {
      window.location.href = '/admin'
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'loading', payload: false })
  }
}

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'loading', payload: true })

  try {
    await axios.post('/api/cars/deletecar', reqObj)

    dispatch({ type: 'loading', payload: false })
    message.success('Car deleted successfully')
    // after success we will just reload page
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'loading', payload: false })
  }
}
