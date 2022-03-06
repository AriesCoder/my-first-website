const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    createComment: (req,res) =>{
        let {name, rating, comment, recipe_id} = req.body
        sequelize.query(`INSERT INTO comments (name, rating, comment, recipe_id)
        VALUES('${name}', ${rating}, '${comment}', ${recipe_id});`)
        .then(dbRes =>
            {console.log('db', dbRes)
            res.status(201).send(dbRes[0])})
        .catch(err => console.log(err))
    },

    getCmtByRecipeId: (req, res) => {
        let recipeId = req.params.id
        console.log('repId', recipeId)
        sequelize.query(`SELECT * 
        FROM comments
        WHERE recipe_id = ${recipeId}
        ORDER BY comment_id DESC;
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
        WHERE rating = ${rate}
        ;`)
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