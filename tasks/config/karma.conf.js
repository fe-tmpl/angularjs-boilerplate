var puppeteerPkg = require('puppeteer/package.json');
var Downloader = require('puppeteer/utils/ChromiumDownloader');

var ChromiumRevision = puppeteerPkg['puppeteer']['chromium_revision'];
var revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);
process.env.CHROMIUM_BIN = revisionInfo.executablePath;

var baseConfig = require('./base.config');
var webpackTestConfig = require('./webpack.test.config');
var pathUtil = require('../utils/path.util');

module.exports = function(config) {
  config.set({
    browsers: [
      'ChromiumHeadless'
    ],
    frameworks: [
      'mocha',
      'chai'
    ],
    files: [
      pathUtil.resolve(baseConfig.dir.test.unit) + '/specs/**/*.spec.js'
    ],
    reporters: [
      'spec',
      'coverage-istanbul'
    ],
    preprocessors: {
      '/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack:webpackTestConfig,
    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
    coverageIstanbulReporter: {
      dir: pathUtil.resolve(baseConfig.dir.test.unit) + '/coverage',
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 1,
          lines: 1,
          branches: 1,
          functions: 1
        }
      }
    }
  });
};
