//
const path = require('path');

const DIR_ROOT = path.join(__dirname, './../../');

const aliasObj = require( path.join(DIR_ROOT, './vue.alias') );
console.log('aliasObj', aliasObj);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/vue-dialog/',
  outputDir: process.env.NODE_ENV === 'production' ? __dirname + '/lib-build' : __dirname + '/demo',
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    // добавляем свои алиасы
    for (const aliasName in aliasObj) {
      config.resolve.alias.set(aliasName, aliasObj[aliasName]);
    }
  },
};
