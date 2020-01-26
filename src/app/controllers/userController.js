
const md5 = require('md5')
const { pool } = require('../../config/database')

module.exports = {

    /**
     * Realiza o cadastro do usuário.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    create(request, response) {

        var type_user = 'user'
        var price = 0
        var type_animator = null
        var pass = request.body.pass

        var { name, email } = request.body
        pass = md5(pass)

        if (typeof request.body.type_user != 'undefined') {
            type_user = request.body.type_user
            price = request.body.price
            type_animator = request.body.type_animator
        }

        pool.query('INSERT INTO users (name, email, pass, type_user, price, type_animator) VALUES ($1, $2, $3, $4, $5, $6)', [name, email, pass, type_user, price, type_animator], (error, results) => {
            if (error) {
                response.status(400).json(error)
            }
            response.status(201).json({
                "status": true
            })
        })
    },


    /**
     * Realiza o login do usuário.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    login(request, response) {

        var { pass, email } = request.body
        pass = md5(pass)

        if (typeof request.body.pass == 'undefined' || typeof request.body.email == 'undefined') {
            response.status(400).json({
                "status": false
            })
        }

        pool.query('SELECT iduser FROM users WHERE email = $1 AND pass = $2', [email, pass], (error, results) => {
            if (error) {
                response.status(400).json(error)
            }

            if (results.rowCount == 0) {
                response.status(400).json({
                    "status": false,
                    "message": "incorrect access"
                })
            }

            response.status(200).json({
                "status": true,
                "id": results.rows[0].iduser
            })
        })
    },


    /**
     * Realiza o consulta de animadores.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async getUsers(request, response) {

        if (typeof request.controller != 'undefined' && request.controller == 1) {
            var { type } = request.query
            var ids = []

            var { rows } = await pool.query('SELECT iduser FROM users WHERE type_user = $1 AND type_animator = $2', ['animator', type])

            for (const user of rows) {

                ids.push(user.iduser)
            }
            return ids
        }

        var { type } = request.query

        if (typeof request.query.type == 'undefined') {
            response.status(400).json({
                "status": false
            })
        }

        pool.query('SELECT iduser,name,email,price  FROM users WHERE type_user = $1 AND type_animator = $2', ['animator', type], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json({
                "status": true,
                "type": type,
                "users": results.rows
            })
        })
    }
}