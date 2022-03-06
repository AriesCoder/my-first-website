require('dotenv').config()
const express = require("express")
const path = require("path")
const cors = require('cors')
const app = express()
const port = process.env.PORT
const {seed} = require('./seed.js')
const {createComment, getCmtByRecipeId, deleteComment, filterRating, getRecipeByName, findRecipes} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.get("/", function(req, res){   
    res.sendFile(path.join(__dirname, '../client/home.html'))  
})

app.use(express.static(path.join(__dirname, '../client/')))

//get all comments
app.get('/comments/:id', getCmtByRecipeId)
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

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

