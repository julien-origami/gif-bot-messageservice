'use strict'
import Hapi from 'hapi'
require('dotenv').config()
import Db from './api/conf/Db'
import routes from './api/routes/Routes'
import swaggered from 'hapi-swaggered'
import swaggeredUI from 'hapi-swaggered-ui'
import vision from 'vision'
import inert from 'inert'

if (!process.env.PATH && process.env.PG_CON) {
  throw 'Make sure you defined PG_CON and PATH in your .env file'
}

const server = new Hapi.Server()
//server.connection({ port: 4323, host: '192.168.100.1', routes: { cors: true }, labels: ['api'] })
server.connection({ port: 4323, host: '192.168.43.20', routes: { cors: true }, labels: ['api'] })

server.register([
    vision,
    inert,
    {
        register: swaggered,
        options: {
            info: {
                title: 'Message Service API',
                description: 'API documentation for Message Service',
                version: '1.0'
            }
        }
    },
    {
        register: swaggeredUI,
        options: {
            title: 'Gif Bot Message-Service API',
            path: '/docs',
            swaggerOptions: {}
        }
    }
], {
    select: 'api'
}, (err) => { if (err) { throw err } })

routes(server)

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})

Db.client.connect((err) => {
    if (err) {
        throw err
        console.error('connection error', err.stack)
    }
})
