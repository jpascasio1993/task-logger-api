
var path = require('path')
var Dotenv = require('dotenv-webpack')
var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
var ESLintPlugin = require('eslint-webpack-plugin')


module.exports = env => {
    var dotEnvPath = env.path
    var entrySource = env.entrySource
    return {
        plugins: [
            new Dotenv({
                path: dotEnvPath,
                safe: true, 
                systemvars: true, 
                silent: true, 
                defaults: false
            }),
         
            new webpack.ProvidePlugin({
                'Promise': 'bluebird'
            }),
            
            new ESLintPlugin({
                extensions: ['ts', 'tsx', 'js', 'json'],
                failOnError: false, // optional: don't break build on lint errors
              })

        ],
        entry: [
            'regenerator-runtime/runtime',
            entrySource
        ],
        target: "node",
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        resolve: {
            mainFields: ['browser', 'main', 'module'],
            extensions: ['.ts', '.js', '.jsx', '.json'], //resolve all the modules other than index.ts
            plugins: [
                new TsconfigPathsPlugin({
                    'extensions': ['.ts', '.js', '.jsx', '.json']
                })
            ]
        },
        module: {
            rules: [
                {
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-typescript']
                        }
                    },
                    exclude: /(node_modules)/,
                    test: /\.js$/
                },
                {
                    use: 'ts-loader',
                    test: /\.ts?$/
                }
                // {
                //     test: /\.ts$/,
                //     enforce: 'pre',
                //     use: [
                //         {
                //             loader: 'tslint-loader',
                //             options: {
                //                 configFile: './tslint.json',
                //                 emitErrors: true,
                //                 typeCheck: true,
                //             }
                //         }
                //     ]
                // }
                // {
                //     // Loads the javacript into html template provided.
                //     // Entry point is set below in HtmlWebPackPlugin in Plugins 
                //     test: /\.html$/,
                //     use: [{loader: "html-loader"}]
                // }
            ]
        },
    }
}