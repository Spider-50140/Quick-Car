import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Defaultlayout from '../components/Defaultlayout'
import { deleteCar, getcardata } from '../redux/actions/caraction'
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import moment from 'moment'
// this line we have copied form icons antd
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'
const { RangePicker } = DatePicker

function AdminHome() {
  const { cars } = useSelector((state) => state.cr)
  const { loading } = useSelector((state) => state.ar)
  const [totalCars, setTotalcars] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getcardata())
  }, [])

  useEffect(() => {
    setTotalcars(cars)
  }, [cars])

  return (
    <Defaultlayout>
      <Row justify='center' gutter={16} className='mt-2'>
        <Col lg={20} sm={24}>
          <div className='d-flex justify-content-between align-items-center'>
            <h3 className='mt-1 mr-2'>Admin Panel</h3>
            <button className='btn1'>
              <a href='/addcar'>ADD CAR</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify='center' gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className='car p-2 bs1'>
                <img src={car.image} className='carimg' />

                <div className='car-content d-flex align-items-center justify-content-between'>
                  <div className='text-left pl-2'>
                    <p>{car.name}</p>
                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                  </div>

                  {/*  we will be using icons for edit and delete , we are using antd icons */}
                  <div className='mr-4'>
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        className='mr-3'
                        style={{ color: 'green', cursor: 'pointer' }}
                      />
                    </Link>
                    {/* we will show a pop-up when user want to delete a car thats why we used popconfirm from antd */}
                    <Popconfirm
                      title='Are you sure to delete this car?'
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }))
                      }}
                      okText='Yes'
                      cancelText='No'
                    >
                      <DeleteOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </Defaultlayout>
  )
}

export default AdminHome
