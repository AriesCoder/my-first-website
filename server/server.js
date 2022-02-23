const express = require("express")
const path = require("path")

const app = express()

app.get("/", function(req, res){   
    res.sendFile(path.join(__dirname, '../client/home.html'))   //changed index -> home
})

app.use(express.static(path.join(__dirname, '../client/')))


const port = process.env.PORT || 4005

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

