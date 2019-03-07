var path = require('path')

var htmlWebpackPlugin = require('html-webpack-plugin')

const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    mode:'development',
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
            // favicon:'./icon.ico'
        }),
        new vueLoaderPlugin()

    ],
    module:{
        rules:[
            {test:/\.css$/, use:['style-loader','css-loader'] },
            {test:/\.scss$/, use:['style-loader','css-loader','sass-loader'] },
            {test:/\.(jpg|png|gif|bmp|jpeg|ttf|eot|svg|woff|woff2|otf)$/,use:'url-loader'},
            // {test:/\.(|||||)$,}
            {test:/\.js$/,use:'babel-loader',exclude:/node-modules/},
            {test:/\.vue$/,use:'vue-loader'},
        ]
    },
    resolve:{
        alias:{
            // 'vue$':'vue/dist/vue.js'
        }
    }

}