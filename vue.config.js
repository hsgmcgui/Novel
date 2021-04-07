module.exports = {
    devServer: {
        proxy: {
            // 'api': "http://api.zhuishushenqi.com",
            // 'aps': "http://chapterup.zhuishushenqi.com"
            'api': {
                target: "http://api.zhuishushenqi.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
                logLevel: 'debug',
            },
            'ips': {
                target: "http://chapter2.zhuishushenqi.com",
                changeOrigin: true,
                pathRewrite: {
                    '^/ips': '',
                },
                logLevel: 'debug',
            }
        }
    }
}