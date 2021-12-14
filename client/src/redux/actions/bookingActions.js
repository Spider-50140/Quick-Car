import axios from 'axios'
import { message } from 'antd'
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: 'loading', payload: true })

  try {
    await axios.post('/api/booking/bookcar', reqObj)

    dispatch({ type: 'loading', payload: false })
    message.success('Your car booked successfully')
    // after successful booking we will navigate user to booking page
    setTimeout(() => {
      window.location.href = '/userbooking'
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'loading', payload: false })
    message.error('Something went wrong , please try later')
  }
}

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'loading', payload: true })

  try {
    const response = await axios.get('/api/booking/getallbookings')
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data })
    dispatch({ type: 'loading', payload: false })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'loading', payload: false })
  }
}
