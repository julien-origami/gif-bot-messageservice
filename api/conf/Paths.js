'use strict'
require('dotenv').config()

const path = process.env.BASIC_PATH
const GIPHY_TOKEN = process.env.GIPHY_TOKEN

module.exports = {
    extern: {
        gifService: {
            getRandomGif: (tag) => {
                return `http://localhost:4322/api/gif/random/${tag}`
            }
        },
        messengerService: {
            postMessage: () => {
                return 'http://localhost:4321/api/message/'
            }
        }
    },
    intern: {
        messages: `${path}messages/{idUser}`,
        message: `${path}message/{id}`,
        messagePost: `${path}message`
    }
}
