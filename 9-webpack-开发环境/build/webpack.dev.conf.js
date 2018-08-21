const webpack = require('webpack')

module.exports = {
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

    plugins: [
        
    ]
}