const mongoose = require('mongoose');

const initializeConnectionDb = async() =>{
    await mongoose.connect('mongodb+srv://omkar:omkar@8354@cluster0.an1ag.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})
    console.log("db connected"); 
}


module.exports = initializeConnectionDb;


