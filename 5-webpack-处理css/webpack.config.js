var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,     //压缩css
                            modules: true,      //模块化
                            localIdentName: '[path][name]_[local]_[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:  {
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,     //压缩css
                                modules: true,      //模块化
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                        }
                    ]
                }) 
                
                
            },
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css'
        })
    ]
}