import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Defaultlayout from '../components/Defaultlayout'
import { getcardata } from '../redux/actions/caraction'
import Spinner from '../components/Spinner'
import { Col, Row, Divider, DatePicker, Modal } from 'antd'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'

import 'aos/dist/aos.css' // You can also use <link> for styles
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { bookCar } from '../redux/actions/bookingActions'

// for aos
import AOS from 'aos'

const { RangePicker } = DatePicker

function BookingCar(match) {
  const params = useParams()
  const dispatch = useDispatch()
  const carobj = useSelector((state) => state.cr)
  const alertobj = useSelector((state) => state.ar)
  const cararray = carobj.cars
  const loading = alertobj.loading

  // Initially its an empty object
  const [car, setcar] = useState({})
  // below are for booking cars
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (cararray.length == 0) {
      dispatch(getcardata())
    } else {
      setcar(cararray.find((i) => i._id == params.carid))
    }
  }, [cararray])

  // this useffect is basically to calculate total amount if driver or totalhour is changed
  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour)
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours)
    }
  }, [driver, totalHours])

  function selectTimeSlots(values) {
    console.log(values)
    // data present in above line in output array can be used using moment library
    const start = moment(values[0]).format('MMM DD yyyy HH:mm')
    const end = moment(values[1]).format('MMM DD yyyy HH:mm')

    setFrom(start)
    setTo(end)
    console.log(start)
    console.log(end)
    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  function onToken(token) {
    console.log(token)
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    }

    dispatch(bookCar(reqObj))
  }

  return (
    <Defaultlayout>
      {loading === true && <Spinner />}
      <Row
        justify='center'
        className='d-flex align-items-center'
        style={{ minHeight: '90vh' }}
      >
        {/* we will be using 10 cols for content and 10 cols for image */}
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img
            src={car.image}
            className='carimg2 bs1 w-100'
            // below line are just for animation when we click on book car the car image will be flipped and loaded
            data-aos='flip-left'
            data-aos-duration='1500'
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className='text-right'>
          <Divider type='horizontal' dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: 'right' }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type='horizontal' dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            //here we have specified how we want to display time
            format='MMM DD yyyy HH:mm'
            onChange={selectTimeSlots}
          />
          <hr />
          {/* we will make a button to show user the booking slots so that he can select easily */}
          <button
            className='btn1 mt-2'
            onClick={() => {
              setShowModal(true)
            }}
          >
            Booked Time Slot
          </button>

          {/* when date will be selected then only we will show the details like bookcar cost and driver etc */}
          {from && to && (
            <div>
              <p>Booking Hours :- {totalHours} Hours</p>

              <p>Rent per hour is :- {car.rentPerHour} </p>
              {/* now we will creat checkbox using antd */}
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true)
                  } else {
                    setdriver(false)
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3>Total amount ={totalAmount} </h3>

              {/* when user will click on booknow button we have to send this values to action */}
              {/*  Here we used stripe and stripe automatically gives us a onclick function called as token={onToken} so whenever we click on book now this onToken function will get executed   */}
              <StripeCheckout
                // we want shipping address of user too so we wrote shippingAddress too below
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey='pk_test_51K67jrSJ5P7KMhg7oQewytCsNnuzWczl1ScCvfrbMJxD3JRkHbf3zmxEkSXjMex12oaHz7vZJyPKNMphkr4HMB3900mBwpCx8R'
              >
                <button className='btn1'>Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
      </Row>

      {/* after clicking on booked time slot we will show one model popup using antd , we will load Modal only when after we get details of that car from backend */}

      {car.name && (
        <Modal
          // it will be visible only when showModel is true and will be closed if its false
          visible={showModal}
          closable={false}
          footer={false}
          title='Booked time slots'
        >
          <div className='p-2'>
            {car.bookedTimeSlots.map((slot) => {
              return (
                <button className='btn1 mt-2'>
                  {slot.from} - {slot.to}
                </button>
              )
            })}

            <div className='text-right mt-5'>
              <button
                className='btn1'
                onClick={() => {
                  setShowModal(false)
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </Modal>
      )}
    </Defaultlayout>
  )
}

export default BookingCar
