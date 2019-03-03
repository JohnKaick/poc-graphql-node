module.exports = `
    type Usuario {
        _id: String
        nome: String
        telefone: String
        email: String
        senha: String
    }

    type Query {
        usuarios: [Usuario]
        qtsUsuarios: Int
    }
`