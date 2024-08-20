const mongoose = require("mongoose");

const teams = new mongoose.Schema({
    name: {
        type: String
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    }
})

const mongModel = new mongoose.model("teams", teams);

module.exports = mongModel;