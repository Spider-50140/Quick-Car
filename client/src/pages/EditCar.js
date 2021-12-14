import { Col, Row, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Defaultlayout from '../components/Defaultlayout'
import Spinner from '../components/Spinner'
import { addCar, editCar, getcardata } from '../redux/actions/caraction'

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.cr)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.ar)
  const [car, setcar] = useState()
  const [totalcars, settotalcars] = useState([])

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getcardata())
    } else {
      settotalcars(cars)
      //Here we are iterating on cars (from carreducer) collection and finding the car with required id
      setcar(cars.find((o) => o._id == match.params.carid))
      console.log(car)
    }
  }, [cars])

  function onFinish(values) {
    // below in the form we are having all details like what to update , caar name , rent per hour etc but when we will be sending this values to backend we also need to send the id of car which we want to update so below line is useful
    values._id = car._id

    dispatch(editCar(values))
    console.log(values)
  }

  return (
    <Defaultlayout>
      {loading && <Spinner />}
      <Row justify='center mt-5'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcars.length > 0 && (
            // for Form we will just add one value thats initialvalues so that we can get value automatically bcz in car object and form object,there are same names, while creating car we have to use same properties which is present in model
            <Form
              initialValues={car}
              className='bs1 p-2'
              layout='vertical'
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name='name'
                label='Car name'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='image'
                label='Image url'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='rentPerHour'
                label='Rent per hour'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='capacity'
                label='Capacity'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='fuelType'
                label='Fuel Type'
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className='text-right'>
                <button className='btn1'>Save Details</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Defaultlayout>
  )
}

export default EditCar
