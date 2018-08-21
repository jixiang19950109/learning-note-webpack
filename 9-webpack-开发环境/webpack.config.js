var path = require('path')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
    },

    devtool: 'cheap-module-source-map',          //eval source-map

    devServer: {
        port: 9001,     //端口
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to: function(context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        },
        proxy: {
            '/api': {
                target: 'http://m.weibo.cn',
                changeOrigin: true,
                overlay: true,
                logLevel: 'debug',  //显示代理信息
                pathRewrite: {
                    '^/comments': '/api/comments'
                },
                headers: {
                    'Cookie': ''
                }
            }
        },
        hot: true,  //热更新
        open: true,
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            },
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
                            singleton: true
                        }
                    },
                    use: [
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
                }) 
                
                
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '../assets/imgs',
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
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
            // {
            //     test: path.resolve(__dirname, 'src/app.js'),
            //     use: [
            //         {
            //             loader: 'imports-loader',
            //             options: {
            //                 $: 'jquery'
            //             }
            //         }
            //     ]
            // }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].min.css'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new HtmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            // chunks: ['app'],
            minify: {
                collapseWhitespace: true,      //压缩空格
            }
            // inject: false,
        }),
        new CleanWebpackPlugin(['dist'])
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
    ]
}