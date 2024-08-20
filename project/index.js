const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");
const nbaData = require("./NbaData.json");
const mongModel = require("./mongoSchema");
const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.Connection_String;
let dataB = nbaData;
//console.log(dataB);
let arr = [];
let arr2 = [];

function pushData() {
    for(let i = 0; i < dataB.Teams.length; i++) {
        arr2.push(dataB.Teams[i]);
    }
    return arr2;
}

app.get('/', async (req, res) => {//This was only used to populate the db with NBA data.
    try {
        await mongoose.connect(uri);
        let storedData = await mongModel.create(pushData());
        arr.push(storedData);
        res.status(200).json(arr);
    } catch(e) {
        console.log(e);
    } finally {
        console.log("Mongoose disconnected. Thank you for your request!");
        await mongoose.disconnect();
    }
})

app.get('/teams', async (req, res) => {//This route will display the data from the db.
    try{
        await mongoose.connect(uri);
        let storedData = await mongModel.find();
        res.status(200).json(storedData);
    }catch(e){
        console.log(e)
    }finally{
        console.log("Mongoose disconnected. Thank you for your request!");
        await mongoose.disconnect();
    }
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port + ".");
})