const path = require('path');

/*

    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.7.1",
    "eslint-plugin-oploshka": "^1.0.7"
 */

module.exports = {
  resolve: {
    alias: {
      'vue-dlg': path.join(__dirname, './'),
    },
  },
};
