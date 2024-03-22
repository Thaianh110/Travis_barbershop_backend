const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require('./routes');
const cors = require('cors')
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

dotenv.config()
const app = express()
const port = process.env.port || 3000


app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);

mongoose.connect(`mongodb+srv://thaianh110:${process.env.MONGO_DB}@cluster0.w3vfogp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log("connect db success") 
})
.catch((err) =>{
    console.log(err)
})
app.listen(port ,() => {
    console.log("Serve is running in port ", + port);
});