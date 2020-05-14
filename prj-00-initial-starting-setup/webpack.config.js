const path = require('path');

module.exports = {
    //esta propiedad le dice a webpack que estamos solo en ambiente de dev y
    //entonces webpack hará ajustes para optimizar nuestra experiencia de desarrollo
    //por ejemplo. crea un bundle menos minimizado, permite un mejor debug , etc
    mode: 'development',
    entry: './src/app.ts',
    output: {
        fileName: 'bundle.js', //el nombre del file
        path: path.resolve(__dirname, 'dist'), //el path ABSOLUTO de la carpeta que contiene al file
        //este parametro se usa solo para el webpack-dev-server sepa donde se genera el bundle
        publicPath: 'dist'
    },
    //acá indicamos que vamos a usar sourcemaps para debugging
    //en tsconfig debe estar habilitada la opcion: "sourceMap": true,
    devtool: 'inline-source-map',
    //con module le decimos a webpack cuales son las reglas que se aplicaran a cuales
    //tipos de files. es decir, cuales serán las tranformaciones y qué loaders se usarán para ellas
    module: {
        rules: [
            {
                test: /\.ts$/, //test se aplica a todos los files e indica cuales deben pasar el filtro
                loader: 'ts-loader', //loader indica cual es el paquete que usará webpack para hacer la transformacion
                exclude: /node_modules/, //usa una regex
            }
        ]
    },
    //resolve indica a webpack qué tipo de files que estan en los ES6 imports irán al bundle
    //y cuales son las extensiones de los mismos, por eso , ya no es necesario colocar 
    //la extension .js en los imports!!!
    //en l
    resolve: {
        extensions: ['.ts','.js']
    }
}

//* Para correr webpack podemos crear un script en package.json:  
// 'build': 'webpack' y lo corremos con:   npm run build
//* en el html linkeamos a <script type="module" src='dist/bundle.js'></script>
//Listo! nuestra app debe correr bien bacan
//* Incluso , como estamos usando source maps, podemos debuggear en chrome, en la pestaña source creo
//* Usar el webpack-dev-server, el cual al correr, automaticamente inicia el servidor y 
//corre toda la configuracion de webpack para generar el bundle
//pero ese bundle lo genera en MEMORIA , osea que no aparece en la carpeta dist
//para eso hay agregar :  publicPath: 'dist'  en la propiedad output

//* Para ambiente de produccion, creamos el archivo  webpack.config.production.js, el nombre es a criterio
//En ese archivo haremos algunas configuraciones extras y quitaremos otras