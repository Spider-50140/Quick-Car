import logo from './logo.svg'
import './App.css'
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import 'antd/dist/antd.css'
import UserBooking from './pages/UserBooking'
import AddCar from './pages/AddCar'
import AdminHome from './pages/Admin'
import EditCar from './pages/EditCar'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        {/* login page and registration page will be accessible to all the users but Home page and booking will only be shown to logged users */}
        <ProtectedRoutes Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoutes
          Route
          path='/booking/:carid'
          exact
          component={BookingCar}
        />
        <ProtectedRoutes
          Route
          path='/userbooking'
          exact
          component={UserBooking}
        />
        <ProtectedRoutes Route path='/addcar' exact component={AddCar} />
        <ProtectedRoutes
          Route
          path='/editcar/:carid'
          exact
          component={EditCar}
        />
        <ProtectedRoutes Route path='/admin' exact component={AdminHome} />
      </BrowserRouter>
    </div>
  )
}

export default App

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return <Route {...props} />
  } else {
    return <Redirect to='/login' />
  }
}
