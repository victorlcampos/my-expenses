module.exports = function(config) {
    process.env['PHANTOMJS_BIN'] = '../node_modules/.bin/phantomjs';
    config.set({
        basePath: '../',

        files: [
            'src/assets/vendor/angular/angular.js',
            'src/assets/vendor/angular-route/angular-route.js',
            'src/assets/vendor/angular-resource/angular-resource.js',
            'src/assets/javascripts/**/*.js',
            'src/assets/vendor/angular-mocks/angular-mocks.js',
            'test/unit/**/*.test.js'
        ],

        exclude: [
            'assets/vendor/**/*.min.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    })
}