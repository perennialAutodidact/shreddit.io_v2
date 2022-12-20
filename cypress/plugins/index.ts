module.exports = (on, config) => {
  if (config.testingType === "component") {
    require("@cypress/react/plugins/react-scripts")(on, config);
  }
  require("cypress-log-to-output").install(on);
  on("log", {
    log(message: any) {
      console.log(message);
      return null;
    },
  });
  return config;
};

export {};
