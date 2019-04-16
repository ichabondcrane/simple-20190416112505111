var webpack = require ('webpack');
const path = require('path');

module.exports = {
    entry: './server.ts',
    output: {
        filename: 'server.js'
    },
    
    resolve: {
        modules: [
            path.join(__dirname, "src/server"),
            "node_modules"
        ],
        extensions: ['.ts', '.js'],
    },
    node: {
        fs: "empty",
        net: "empty"
     },
    module: {

       loaders: [
           { test: /\.ts$/,
             loaders: 'ts-loader'
        }
       ]
    }

}