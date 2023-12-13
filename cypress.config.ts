import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";
export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      // optionally pass in webpack config
      webpackConfig,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
