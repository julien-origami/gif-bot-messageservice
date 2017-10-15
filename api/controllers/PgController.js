'use-strict'
import Db from '../conf/Db'

module.exports = {
    getMessages: (idUser) => {
        return Db.query('SELECT * FROM message WHERE idUser = $1 ORDER BY creationdate ASC', [idUser])
    },
    getMessage: (id) => {
        return Db.query('SELECT * FROM message WHERE id = $1', [id])
    },
    deleteMessage: (id) => {
        return Db.query('DELETE FROM message WHERE id = $1', [id])
    },
    createMessage: (message) => {
        return Db.query('insert into message(content, creationdate, iduser) values($1, $2, $3) RETURNING *', [message.content, message.creationdate, message.iduser])
    }
}
