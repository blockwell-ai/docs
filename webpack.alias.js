// This file outputs the Webpack config used by VuePress for use with
// IDEs like WebStorm

const sp = require('synchronized-promise');

const vp = require('@vuepress/core/lib');

const sync = sp(vp.dev);

const app = sync({
    sourceDir: '/home/orblog/Work/Blockwell/docs/docs',
    theme: '@vuepress/default',
    '--': [],
    cache: true,
    'clear-screen': true
});

module.exports = app.devProcess.webpackConfig;
