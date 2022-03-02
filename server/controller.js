const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    createComment: (req,res) =>{
        let{name, rating, comment} = req.body
        sequelize.query(`INSERT INTO comments (name, rating, comment)
        VALUES('${name}', ${rating}, '${comment}');`)
        .then(dbRes =>
            res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getComments: (req, res) => {
        sequelize.query(`SELECT * 
        FROM comments
        `) 
        .then(dbArr => res.status(200).send(dbArr[0]))
        .catch(err => console.log(err))
    },

    deleteComment: (req,res) =>{
        let {id} = req.params
        sequelize.query(`DELETE
        FROM comments
        WHERE comment_id = ${id};`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    filterRating: (req, res) =>{
        let {rate} = req.params
        sequelize.query(`SELECT * FROM comments
        WHERE rating = ${rate};`)
        .then(dbRes => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },

    getRecipeByName: (req, res) =>{
        let {name} = req.params
        sequelize.query(`SELECT * FROM recipes
        WHERE name = '${name}';`)
        .then(dbRes => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },
   
    findRecipes: (req, res) =>{
        let {input} = req.params
        sequelize.query(`SELECT link FROM recipes
        WHERE (ingredients LIKE '%${input}%') OR (name LIKE '%${input}%');`)
        .then(dbRes => {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    }
        
}