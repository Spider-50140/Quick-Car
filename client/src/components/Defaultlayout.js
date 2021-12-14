import React from 'react'
import { Menu, Dropdown, Button, Space, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

// we will be using this default layout for  all our pages to render the content , here we have one div with classname as content, here only we will be rendering all our pages, we will be passing content of all our pages to default layout with the help of props and then render in div content as props.children
function Defaultlayout(props) {
  // we need to show name of user has just performed login so below statements are necessary
  const user = JSON.parse(localStorage.getItem('user'))

  // menu code we have copied from antd
  const menu = (
    <Menu>
      <Menu.Item>
        <a href='/'>Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href='/userbooking'>Booking</a>
      </Menu.Item>
      <Menu.Item>
        <a href='/admin'>Admin</a>
      </Menu.Item>
      <Menu.Item
        // after clicking on logout we will remove details of that user from localstorage and move him to login page
        onClick={() => {
          localStorage.removeItem('user')
          window.location.href = '/login'
        }}
      >
        <li style={{ color: 'orangered' }}>Logout</li>
      </Menu.Item>
    </Menu>
  )
  return (
    <div>
      <div className='header b1'>
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className='d-flex justify-content-between '>
              <h1>
                <Link to='/'>Quick-Car</Link>
              </h1>
              {/* below dropdown code we have taken from antd wesbiite */}
              <Dropdown overlay={menu} placement='bottomCenter'>
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className='content'>{props.children}</div>
      <div className='footer text-center'>
        <hr />
        <p style={{ background: '#71DFE7', padding: '10px' }}>
          Designed and Developed by Satya
        </p>
      </div>
    </div>
  )
}

export default Defaultlayout
