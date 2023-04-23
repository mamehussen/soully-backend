const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://mame:ASDF1234@cluster0.qka7bic.mongodb.net/soully?retryWrites=true&w=majority'

mongoose
    .connect(connectionString)
    .then(()=>console.log('CONNECTED TO DB'))
    .catch((err) => console.log(err))