module.exports = function(config) {
    process.env['PHANTOMJS_BIN'] = 'node_modules/.bin/phantomjs';
    config.set({
        basePath: '../',

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