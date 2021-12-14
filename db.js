const mongoose = require('mongoose')
function connectDB() {
  mongoose.connect(
    'mongodb+srv://Satya934:021221@cluster0.5tbpy.mongodb.net/Car-collection',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log('MongoDB Connection Succeeded.')
      } else {
        console.log('Error in DB connection: ' + err)
      }
    }
  )
  const connection = mongoose.connection
  connection.on('connected', () => {
    console.log('Mongo DB connection Successfull!!')
  })
  connection.on('error', () => {
    console.log('Connection Failed')
  })
}
// Earlier we used to write mongoose connection code directly here we have written everything in connectDB function and below we called that function
connectDB()
module.exports = mongoose
