import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getcardata } from '../redux/actions/caraction'
import Defaultlayout from './../components/Defaultlayout'
import { Button, Row, Col, DatePicker } from 'antd'
import Spinner from '../components/Spinner'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker

function Home() {
  const carobj = useSelector((state) => state.cr)
  const alertobj = useSelector((state) => state.ar)
  const [totalCars, setTotalcars] = useState([])
  const dispatch = useDispatch()

  const cararray = carobj.cars

  const loading = alertobj.loading

  useEffect(() => {
    dispatch(getcardata())
  }, [])

  useEffect(() => {
    setTotalcars(cararray)
  }, [cararray])

  // setfilter is a function which will filter car based on availablity
  function setFilter(values) {
    var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
    var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

    var temp = []

    for (var car of cararray) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car)
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car)
          }
        }
      }
    }

    setTotalcars(temp)
  }

  // in Bootstrap for row we have 12 cols we have but in antd we have 24 cols and we want 4 cars in a row so we will allocate 5 cols per car , so  5*4=20 will be used for car and remaning part for margin onleft and right
  const cardata = totalCars.map((i) => {
    return (
      // for large device 5 cols per car and for small and extra small 24cols or complete width
      <Col lg={5} sm={24} xs={24}>
        <div className='car p-2 b1 '>
          <img src={i.image} className='carimg' />
          <div className='car-content  d-flex align-items-center justify-content-between '>
            <div>
              <p>{i.name} </p>
              <p>Rent - Rs {i.rentPerHour}/hr </p>
            </div>
            <div>
              {/* <button className='btn1 mr2'>Book Now</button> */}
              <button className='btn1 mr-2'>
                <Link to={`/booking/${i._id}`}>Book Now</Link>
              </button>
            </div>
          </div>
        </div>
      </Col>
    )
  })
  // mt stands for margin top
  return (
    <Defaultlayout>
      <Row className='mt-3' justify='center' style={{ margin: '30px' }}>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='MMM DD yyyy HH:mm'
            onChange={setFilter}
          />
        </Col>
      </Row>

      {loading === true && <Spinner />}
      <Row justify='center' gutter={20} style={{ margin: '15px' }}>
        {cardata}
      </Row>
      {/* <button onClick={check}>check</button> */}
    </Defaultlayout>
  )
}

export default Home
