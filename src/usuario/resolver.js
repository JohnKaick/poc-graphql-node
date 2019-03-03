const mongosse = require('mongoose');
const Usuario = mongosse.model('Usuario');

module.exports = {
    Query: {
        // Listar de todos os usuarios
        usuarios: async (obj, args) => {
            return (await Usuario.find())
        },
        // Quantidade total de usuarios cadastrados.
        qtsUsuarios: async (obj, args) => {
            let result = 0
            await Usuario.find({}, function (err, results) {
                result = results.length
            })
            return result
        }
    }
}