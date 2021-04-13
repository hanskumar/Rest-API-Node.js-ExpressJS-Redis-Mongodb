require("dotenv").config();
const mongoose      = require('mongoose');

/*-----Connect to DB----------*/
module.exports = (req, res) => {

    mongoose.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
    }).then(()=>{
        console.log('Mongo Database connected..!!!!!');
    }).catch(err=>{
        console.log("Connection ERROR::"+ err);
    });
}


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
  })
  
  mongoose.connection.on('error', (err) => {
    console.log(err.message)
  })
  
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected.')
  })
  
  process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
  })