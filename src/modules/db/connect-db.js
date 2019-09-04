const mongoose = require('mongoose');

const connectToDB = (dbUrl) => {
    mongoose.connect(dbUrl, { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error ' + err)
        })
};

module.exports = connectToDB;