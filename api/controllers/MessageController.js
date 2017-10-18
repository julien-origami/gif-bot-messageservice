'use-strict'
import Paths from '../conf/Paths'
import PgController from './PgController'
import Boom from 'boom'
import fetch from 'node-fetch'

exports.getMessage = (request, reply) => {
    PgController.getMessage(request.params.idUser)
    .then(rows => reply(rows))
}

exports.postMessage = (request, reply) => {
    PgController.createMessage(request.payload, true)
    .then(rows => reply(rows[0]))
    .catch(e => {
        reply(Boom.badRequest())
    })
    getGif(request.payload.content)
    .then(json => {
        const resMessage = {
            content: json.content,
            creationdate: new Date(),
            iduser: request.payload.iduser
        }
        PgController.createMessage(resMessage)
        const res = {
            content: json.content,
            iduser: request.payload.idmessenger
        }
        postOnMessenger(res)
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

const getGif = (tag) => {
    return fetch(Paths.extern.gifService.getRandomGif(tag))
    .then(res => res.json())
    .catch(err => console.log(err))
}

const postOnMessenger = (message) => {
    return fetch(Paths.extern.messengerService.messagePost(), {
        method: 'POST',
        body: JSON.stringify(message) })
    .catch(err => console.log(err))
}
