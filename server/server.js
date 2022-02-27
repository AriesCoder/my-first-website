require('dotenv').config()
const express = require("express")
const path = require("path")
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
app.use(express.json())
app.use(cors())
const {seed, createComment, getComments, deleteComment, ascRating} = require('./controller.js')

// app.get("/", function(req, res){   
//     res.sendFile(path.join(__dirname, '../client/home.html'))  
// })

app.use(express.static(path.join(__dirname, '../client/')))

//get all comments
app.get('/link1', getComments)

//create comment
app.post('/link1', createComment)

//delete comment
app.delete('/link1/:id', deleteComment)

//DEV
app.post('/seed', seed)

















// const port = process.env.PORT || 5432

app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`)
})

