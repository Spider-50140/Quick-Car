const express = require('express')
const app = express()

app.use(express.json())
const path = require('path')

// setting up mongodb connection
const dbConnection = require('./db')

// when in URL we will type "/api/cars" it should redirect to carroute and then in carroute we have written furthur logic what should happen next
const carmodel = require('./routes/carroute')
const userpath = require('./routes/userroute')
const booking = require('./routes/bookingRoute')
app.use('/api/cars/', carmodel)
app.use('/api/users/', userpath)
app.use('/api/booking/', booking)

// app.get('/check', (req, res) => {
//   var sp = ['bittu', 'Satya', 'Prakash']
//   res.send(sp)
// })

if (process.env.NODE_ENV === 'production') {
  // after deploying to server we are going to get a build folder inside client and there only we will have all of our client related code
  app.use('/', express.static('client/build'))

  // Its for the entry point, for all the client request we have to got to client/build/index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
  })
}

app.get('/', (req, res) => res.send('MERN Car-Rental !!'))


const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
