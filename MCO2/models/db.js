const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const database = {

    connect: function () {
        const dbURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        mongoose.connect(dbURI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((result) => console.log("Connected to db"))
        .catch((err) => console.log(err));      
    }
};


module.exports = database;