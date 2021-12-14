const express = require('express')
const router = express.Router()
const Booking = require('../models/bookingModel')
const Car = require('../models/carModel')

// it will give unique id for every payment
const { v4: uuidv4 } = require('uuid')
// imported stripe and pasted backend key which we got on stripe website
const stripe = require('stripe')(
  'sk_test_51K67jrSJ5P7KMhg7EDuX7JcpqVNlcaqRIjJI6bHkozZ0pwj6m6y0c0V11WbdwROIzs2IDE6xNzq9TxuKI95hVrmc003LEIZzdP'
)

router.post('/bookcar', async (req, res) => {
  const { token } = req.body

  // now in try catch block we will write code to check if payment is successful then only store the data in database

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    )
    // so now if above things work fine then payment will have boolean value as true otherwise false
    if (payment) {
      // source is basically customer so we are looking for payment.customer.id
      req.body.transactionId = payment.source.id
      const newbooking = new Booking(req.body)
      await newbooking.save()
      const car = await Car.findOne({ _id: req.body.car })
      console.log(req.body.car)
      car.bookedTimeSlots.push(req.body.bookedTimeSlots)

      await car.save()
      res.send('Your booking is successfull')
    } else {
      return res.status(400).json(error)
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

// router.post('/bookcar', async (req, res) => {
//   req.body.transactionId = '1234'
//   try {
//     const newbooking = new Booking(req.body)
//     await newbooking.save()
//     const car = await Car.findOne({ _id: req.body.car })
//     console.log(req.body.car)
//     car.bookedTimeSlots.push(req.body.bookedTimeSlots)

//     await car.save()
//     res.send('Booked Successfully !!')
//   } catch (error) {
//     return
//     res.status(400).json(error)
//   }
// })

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car')
    res.send(bookings)
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router
