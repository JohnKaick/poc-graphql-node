const { GraphQLServer } = require('graphql-yoga');
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const serverDir = path.resolve(__dirname, 'src');

require('dotenv').config()

// import todas as models db
fs.readdirSync(serverDir).forEach((diretorios) => {
    let modelsDir = path.resolve(serverDir, diretorios, 'model.js');
    require(modelsDir)(mongoose, mongoose.Schema.Types)
})

// Conexão com DB
const uri = process.env.MONGO_URI;
mongoose.promiseLibrary = global.Promise;
if (process.env.NODE_ENV === 'development') {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
        console.log('Mongodb is running in localhost')
    });
} else {
    mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
        console.log('Mongodb is running')
    }, err => {
        console.log(`Error connection mongodb: ${err}`)
    });
}


/* GRAPHQL */

const usuarioTypes = require('./src/usuario/type')
const usuarioResolvers = require('./src/usuario/resolver')

const schema = makeExecutableSchema({
    typeDefs: [
        usuarioTypes
    ],
    resolvers: merge(
        usuarioResolvers
    )
  })

const server = new GraphQLServer({
  schema,
})

server.start(() => console.log('Server is running on localhost:4000'))