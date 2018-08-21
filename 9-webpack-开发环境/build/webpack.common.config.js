const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')

const merge = require('webpack-merge')
var extractLess = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const generateConfig = env => {

    const scriptLoader = ['babel-loader']
        .concat(env === 'production'
            ? []
            : ['eslint-loader']
        )

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                // minimize: true,     //压缩css
                // modules: true,      //模块化
                localIdentName: '[path][name]_[local]_[hash:base64:5]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: [
                    require('postcss-sprites')({
                        spritePath: 'dist/assets/imgs',
                        // retina: true
                    }),
                    // require('autoprefixer')(),
                    require('postcss-cssnext')()
                ]
            }
        },
        {
            loader: 'less-loader',
        }
    ]
    const styleLoader = env === 'production'
        ? extractLess.extract({
            fallback: 'style-loader',
            use: cssLoaders
        })
        : [{
            loader: 'style-loader'
        }].concat(cssLoaders)

    return {
        entry: {
            app: './src/app.js'
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].bundle.js',
        },

        resolve: {
            alias: {
                jquery$: path.resolve(__dirname, 'src/libs/jquery.js')
            }
        },
        
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: scriptLoader
                }
            ]
        }
    }
}

module.exports = env => {
    let config = env === 'production'
        ? productionConfig
        : developmentConfig
        return merge(generateConfig(env), config)
}