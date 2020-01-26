const express = require('express')
const cors = require('cors')


class App {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'
        this.express.use(cors())

        // this.database()
        this.middlewares()
        this.routes()
    }

    //  database() {
      
    //     mongoose.connect(databaseConfig.uri, {
    //         useCreateIndex: true,
    //         useNewUrlParser: true
    //     } )
    //  }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new App().express