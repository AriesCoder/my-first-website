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
        let {name, rating, comment} = req.body
        sequelize.query(`INSERT INTO comments (name, rating, comment)
        VALUES('${name}', ${rating}, '${comment}');`)
        .then(dbRes =>
            res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getCmtByRecipeId: (req, res) => {
        let recipeId = req.params.id
        console.log('repId', recipeId)
        sequelize.query(`SELECT * 
        FROM comments
        WHERE recipe_id = ${recipeId};
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
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },

    getRecipeByName: (req, res) =>{
        let {name} = req.params
        sequelize.query(`SELECT * FROM recipes
        WHERE name = '${name}';`)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },
   
    findRecipes: (req, res) =>{
        let {input} = req.params
        sequelize.query(`SELECT link FROM recipes
        WHERE (lower(ingredients) LIKE lower('%${input}%')) 
        OR (lower(name) LIKE lower('%${input}%')) 
        OR (lower(title) LIKE lower('%${input}%'))
        OR (lower(instructions) LIKE lower('%${input}%'));`)
        .then(dbRes => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    }
        
}