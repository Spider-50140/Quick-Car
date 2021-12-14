const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.post('/login', (req, res) => {
  const { username, password } = req.body
  User.findOne({ username, password }, function (doc, err) {
    if (err) {
      res.send(err)
    } else {
      res.send(doc)
    }
  })
})

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body

//   try {
//     const user = await User.findOne({ username, password })
//     if (user) {
//       res.send(user)
//     } else {
//       return res.status(400).json(error)
//     }
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// })

router.post('/register', (req, res) => {
  const newuser = new User(req.body)
  newuser.save(function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send('User registered successfully')
    }
  })
})

// router.post('/register', async (req, res) => {
//   try {
//     const newuser = new User(req.body)
//     await newuser.save()
//     res.send('User registered successfully')
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// })

module.exports = router
