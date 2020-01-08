const path = require('path');
const CleanWebpack = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        fileName: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), 
        //publicPath: 'dist'
    },
    //devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/, 
                loader: 'ts-loader', 
                exclude: /node_modules/, 
            }
        ]
    },
    resolve: {
        extensions: ['.ts','.js']
    },
    //Para produccion podemos agregar plugins que nos ayuden con ciertas funcionalidades que queremos
    plugins: [
        //usaremos un plugin que sirve para limpiar la carpeta dist cada vez antes de que se 
        // cree un nuevo bundle. lo instalamos con:  npm install --save clean-webpack-plugin
        new CleanWebpack.CleanWebpackPlugin()
    ]
}

//* Para indicar a mi aplicacion que debe usar este file de produccion webpack.config.prod.js,
//modifico el script:   "build": "webpack --config webpack.config.prod.js"
