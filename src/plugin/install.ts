

export const install = (app: any, options) => {
  console.log('Installing plugin')
  app.config.globalProperties.$dialog      = options.action;
  app.config.globalProperties.$dialogStore = options.store;
};

export default {
  install,
};

// import HelloWorldBuild from "./HelloWorldBuild.vue";
// export { HelloWorldBuild };