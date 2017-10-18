'use strict'
require('dotenv').config()

const path = process.env.BASIC_PATH

module.exports = {
    extern: {
        gifService: {
            getRandomGif: (tag) => {
                return `http://192.168.100.1:4322/api/gif/random/${tag}`
            }
        },
        messengerService: {
            messagePost: () => {
                return 'http://localhost:4321/api/reply'
            }
        }
    },
    intern: {
        messages: `${path}messages/{idUser}`,
        message: `${path}message/{id}`,
        messagePost: `${path}message`
    }
}
