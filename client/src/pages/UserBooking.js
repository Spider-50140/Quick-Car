import React, { useState, useEffect } from 'react'
import Defaultlayout from '../components/Defaultlayout'
import { useDispatch, useSelector } from 'react-redux'
import { bookCar, getAllBookings } from '../redux/actions/bookingActions'

import { Col, Row } from 'antd'
import Spinner from '../components/Spinner'
import moment from 'moment'

function UserBookings() {
  const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.br)
  const { loading } = useSelector((state) => state.ar)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    dispatch(getAllBookings())
  }, [])

  // in database there will be multiple bookings but we only need to browse those bookings which is done by our current logged in user so we are filtering out data and storing necessary ones on curruserdata
  const curruserdata = bookings.filter((i) => i.user == user._id)

  return (
    <Defaultlayout>
      {loading && <Spinner />}
      <h3 className='text-center mt-2'>My Bookings</h3>
      <Row justify='center' gutter={16}>
        <Col lg={16} sm={24}>
          {curruserdata.map((booking) => {
            return (
              <Row gutter={16} className='b1 mt-3 text-left'>
                {/* there are total 24 cols so we are using first 6 for displaying col-1 (car name,total hour,rent per hour,total fare) , next 12 for displaying col(from,to,transaction id,total fare) , next 6 for cols(diplaying image)*/}

                {/* This is col-1  */}
                <Col lg={6} sm={24}>
                  <p>
                    <b>{booking.car.name}</b>
                  </p>
                  <p>
                    Total hours : <b>{booking.totalHours}</b>
                  </p>
                  <p>
                    Rent per hour : <b>{booking.car.rentPerHour}</b>
                  </p>
                  <p>
                    Total amount : <b>{booking.totalAmount}</b>
                  </p>
                </Col>

                {/* This is COl-2 */}
                <Col lg={12} sm={24}>
                  <p>
                    Transaction Id : <b>{booking.transactionId}</b>
                  </p>
                  <p>
                    From: <b>{booking.bookedTimeSlots.from}</b>
                  </p>
                  <p>
                    To: <b>{booking.bookedTimeSlots.to}</b>
                  </p>
                  <p>
                    Date of booking:{' '}
                    <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b>
                  </p>
                </Col>

                {/* This is COl-3 */}
                <Col lg={6} sm={24} className='text-right'>
                  <img
                    style={{ borderRadius: 5 }}
                    src={booking.car.image}
                    height='140'
                    className='p-2'
                  />
                </Col>
              </Row>
            )
          })}
        </Col>
      </Row>
    </Defaultlayout>
  )
}

export default UserBookings
