const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/cesizen/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'CESIZen';
      return args;
    });
  }
});
