const md5 = require('md5')
const { pool } = require('../../config/database')

const User = require('./userController')

module.exports = {

    /**
     * Realiza o cadastro do horário.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    create(request, response) {
        if (typeof request.body.id_animator == 'undefined' || typeof request.body.name == 'undefined' ||
            typeof request.body.date == 'undefined' || typeof request.body.place == 'undefined' ||
            typeof request.body.blocking == 'undefined' || typeof request.body.requester == 'undefined') {
            response.status(400).json({
                "status": false
            })
        }

        var { id_animator: users_iduser, name, date, place, blocking, requester } = request.body

        pool.query('INSERT INTO schedules (users_iduser, name, date, place, blocking, requester) VALUES ($1, $2, $3, $4, $5, $6)', [users_iduser, name, date, place, blocking, requester], (error, results) => {
            if (error) {
                response.status(400).json(error)
            }
            response.status(201).json({
                "status": true,                
            })
        })
    },

    /**
     * Realiza a consulta de horários.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async get(request, response) {

        if (typeof request.query.date_init == 'undefined' || typeof request.query.date_end == 'undefined' ||
            typeof request.query.type == 'undefined') {
            response.status(400).json({
                "status": false
            })
        }

        var { date_init, date_end } = request.query
        
        request.controller = 1

        var ids = await User.getUsers(request)

        var params = []
        for (var i = 1; i <= ids.length; i++) {
            params.push('$' + i);
        }

        pool.query('SELECT * FROM schedules WHERE users_iduser in (' + params.join(',') + ') AND date >= \'' + date_init + '\' AND date <= \'' + date_end + '\'', ids, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json({
                "status": true,
                "result": results.rows
            })
        })
    },

     /**
     * Realiza a consulta de horários marcados do usuário.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    getSchedulesUser(request,response) {

        var { id } = request.params        

        if (typeof request.params.id == 'undefined') {
            response.status(400).json({
                "status": false
            })
        }

        pool.query('SELECT * FROM schedules WHERE requester = $1 ', [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json({
                "status": true,
                "result": results.rows
            })
        })
    }
}