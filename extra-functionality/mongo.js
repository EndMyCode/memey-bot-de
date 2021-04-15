const mongoose = require('mongoose');
const { mongoPath } = require('../config.json');

module.exports = async() => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Connected.");
    }).catch(err => {
        console.log(`Connection Error: ${err.message}`)
    });
    return mongoose;
}