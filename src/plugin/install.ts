
//
export default {
  install(app, options) {
    app.config.globalProperties.$dialog      = options.action;
    app.config.globalProperties.$dialogStore = options.store;
  }
};
