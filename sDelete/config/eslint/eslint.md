

```js

  "scripts": {
    "serve": "cd ./test/app && npm run serve --port 3000",
    "old-serve": "vue-cli-service serve --port 3000 srcDev/main.js",
    "old-serveBuild": "vue-cli-service serve --port 3000 srcDev/mainBuild.js",
    "old-build": "vue-cli-service build --target lib --name vue-dialog src/plugin.js && cp lib-build/vue-dialog.umd.min.js lib/vue-dialog.js",
    "old-buildReprot": "vue-cli-service build --report --target lib --name vue-dialog src/plugin.js",
    "old-lint": "vue-cli-service lint"
  },
```