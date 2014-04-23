exports.config = {
  allScriptsTimeout: 11000,
  seleniumServerJar: '../node_modules/selenium-standalone/.selenium/2.41.0/server.jar',
  specs: [
    'e2e/**/*.js'
  ],
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path':'node_modules/.bin/phantomjs',
    'phantomjs.cli.args':['--webdriver=8080']
  },
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};