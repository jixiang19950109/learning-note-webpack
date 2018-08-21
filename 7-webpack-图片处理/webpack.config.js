var path = require('path')
var webpack = require('webpack')
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

    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.js')
        }
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
                                // modules: true,      //模块化
                                // localIdentName: '[path][name]_[local]_[hash:base64:5]'
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
                }) 
                
                
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './assets/imgs',
                            // outputPath: '',
                            useRelativePath: true
                        }
                    },
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 10000,
                    //         fallback: 'file-loader'
                    //     }
                    // }

                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: './assets/imgs',
                            // outputPath: '',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].min.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
    ]
}