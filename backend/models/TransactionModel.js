const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    mandate: {
        type: String,
        required: true
    },
    geography: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction