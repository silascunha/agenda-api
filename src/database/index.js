const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

try {
    mongoose.connect('mongodb://localhost:27017/agenda_api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
catch (err) {
    console.log(err.message);
}

module.exports = mongoose;