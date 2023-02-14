import { defineConfig } from "cypress";

export default defineConfig({
  videoCompression: false,
  video: false,
  watchForFileChanges: true,
  component: {
    specPattern: ["**/*.cy.tsx", "**/*.cy.ts"],
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
