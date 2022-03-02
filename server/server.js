require('dotenv').config()
const express = require("express")
const path = require("path")
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
const {createComment, getComments, deleteComment, filterRating, getRecipeByName, findRecipes} = require('./controller.js')
const {seed} = require('./seed.js')

app.use(express.json())
app.use(cors())

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
//get filtered rating comments
app.get('/link1/:rate', filterRating)
//get recipe
app.get('/recipes/:name', getRecipeByName)
//find recipe
app.get('/search/:input', findRecipes)


//DEV
app.post('/seed', seed)

















// const port = process.env.PORT || 5432

app.listen(SERVER_PORT, ()=>{
    console.log(`Listening on port ${SERVER_PORT}`)
})

