const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const thanksSchema = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    received: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('thanks', thanksSchema, 'thanks');