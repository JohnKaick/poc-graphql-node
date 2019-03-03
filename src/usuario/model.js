module.exports = function (mongoose, Types) {

    const UsuarioSchema = mongoose.Schema({
        nome: { type: String },
        telefone: { type: String },
        email: { type: String },
        senha: { type: String },
        premium: { type: Boolean },
        createdAt: Date,
    }, { collection: 'usuario' });    

    return mongoose.model('Usuario', UsuarioSchema);
}