/*'use strict'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:oploshka/recommended',
    'plugin:oploshka/overrides-test-jest',
  ],
  globals: {
    "CONST": true,
    "ENUM": true,
    "VueApp": true,
    "RequestManager": true,
    "DateTime": true,
    "FileClass": true
  },
};
*/

// Документация по новому eslint
// https://eslint.vuejs.org/user-guide/

import pluginVue from 'eslint-plugin-vue'

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    }
  }
]