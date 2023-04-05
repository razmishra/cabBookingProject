const dotenv = require("dotenv").config("./.env")
const express = require("express")
require("./connection_string/mongoDB")
const app = express()
const router = require("./routes/routes")
const path = require("path")

app.use(express.static(path.join(__dirname, "views")));
app.use(express.json())
app.use(router)



app.listen(3000, ()=>{
	console.log("Started listening on port 3000")
})
