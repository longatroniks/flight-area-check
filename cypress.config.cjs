const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // custom tasks/events can go here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
  },
});
