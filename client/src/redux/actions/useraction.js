import axios from 'axios'
import { message } from 'antd'

//Here we will be sending data so axios.post method will be used , we are storing login data in local browser storage only and after successful login we will show one antd message ,same in case of error too

export const userlogin = (data) => (dispatch) => {
  dispatch({ type: 'loading', payload: true })
  axios
    .post('/api/users/login', data)
    .then((res) => {
      // we are setting data in localstorage bcz later we will be displaying name of the user in top right side of home page , meaning when any user will click on login then we will display his name at top right side in homepage
      localStorage.setItem('user', JSON.stringify(res.data))
      message.success('Login Success')
      //after successful login we will go to home page
      setTimeout(() => {
        // after 0.05sec it will redirect to home page
        window.location.href = '/'
      }, 500)
      dispatch({ type: 'loading', payload: false })
    })
    .catch((err) => {
      console.log(err)
      message.error('Something went Wrong !!')
      dispatch({ type: 'loading', payload: false })
    })
}

// this is for register page.Here we will show one antd component if login is successful and after that we want that it should automatically redirect to login page so settimeout method is used

export const userregister = (data) => (dispatch) => {
  dispatch({ type: 'loading', payload: true })
  axios
    .post('/api/users/register', data)
    .then((res) => {
      message.success('Login Success')
      setTimeout(() => {
        // after 0.05sec it will redirect to login page
        window.location.href = '/login'
      }, 500)

      dispatch({ type: 'loading', payload: false })
    })
    .catch((err) => {
      console.log(err)
      message.error('Something went Wrong !!')
      dispatch({ type: 'loading', payload: false })
    })
}
