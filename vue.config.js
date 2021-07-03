module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/vue-dialog/',
  outputDir: process.env.NODE_ENV === 'production' ? __dirname + '/lib' : __dirname + '/demo',
  css: {
    extract: false
  }
};
