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
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getComments: (req, res) => {
        sequelize.query(`SELECT * 
        FROM comments 
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
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

    seed: (req,res) =>{sequelize.query(
        `drop table if exists comments;

        CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            name VARCHAR(200),
            rating INT,
            comment TEXT);
        `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    }
}