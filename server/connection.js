const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://amenikhardeni12:ameni123@cluster0.no8wj77.mongodb.net/?retryWrites=true&w=majority`, ()=> {
  console.log('connected to mongodb')
})
