'use strict'
import MessageService from '../controllers/MessageController.js'
import Paths from '../conf/Paths'
import Joi from 'joi'

module.exports = (server) => {

    server.route({
        method: 'GET',
        path: Paths.intern.message,
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().integer().required().description('id')
                }
            },
            handler: MessageService.getMessage
        }
    })

    server.route({
        method: 'POST',
        path: Paths.intern.messagePost,
        handler: MessageService.postMessage,
        config: {
            tags: ['api'],
            validate: {
                payload: {
                    content: Joi.string().min(0).required(),
                    creationdate: Joi.date().timestamp().required(),
                    iduser: Joi.number().integer().min(0).required(),
                    idmessenger: Joi.string().min(15).max(17).required()
                }
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: Paths.intern.message,
        config: {
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().integer().required().description('id')
                }
            },
            handler: MessageService.deleteMessage
        }
    })

    server.route({
        method: 'GET',
        path: Paths.intern.messages,
        config: {
            tags: ['api'],
            validate: {
                params: {
                    idUser: Joi.number().integer().required().description('idUser')
                }
            },
            handler: MessageService.getMessages
        }
    })
}
