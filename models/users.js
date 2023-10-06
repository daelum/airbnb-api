const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const Users = mongoose.model('users', {
    avatar: String,
    email: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = Users