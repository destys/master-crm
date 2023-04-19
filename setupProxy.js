const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://app.mango-office.ru',
            changeOrigin: true,
            headers: {
                'X-API-KEY': '4dz6tn8l1667rg7dw2kcrofp9fkp9enq',
            },
            pathRewrite: {
                '^/api': '/vpbx/stats/v1/calls',
            },
        })
    );
};
