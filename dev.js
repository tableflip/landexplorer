// From: https://github.com/BrowserSync/browser-sync/issues/708#issuecomment-118523817
var historyApiFallback = require('connect-history-api-fallback')
var bs = require('browser-sync').create()

bs.init({
  open: false,
  files: ['dist'],
  server: {
    baseDir: 'dist',
    middleware: [ historyApiFallback() ]
  }
})
