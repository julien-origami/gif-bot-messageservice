'use-strict'
import fetch from 'node-fetch'
import Paths from '../conf/Paths'
import PgController from './PgController'
import UUID from 'uuid'
import Boom from 'boom'

exports.getMessage = (request, reply) => {
    PgController.getMessage(request.params.idUser)
    .then(rows => reply(rows))
}

exports.postMessage = (request, reply) => {
    PgController.createMessage(request.payload)
    .then(rows => reply(rows[0]))
    .catch(e => {
        reply(Boom.badRequest())
    })
}

exports.deleteMessage = (request, reply) => {
    PgController.deleteMessage(request.params.idUser)
    .then(() => reply())
}

exports.getMessages = (request, reply) => {
    PgController.getMessages(request.params.idUser)
    .then(rows => reply(rows))
}
