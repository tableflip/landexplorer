module.exports = {
  'local-plugins': true,
  use: [
    'postcss-import',
    'postcss-custom-media',
    'postcss-custom-properties',
    'postcss-calc',
    'autoprefixer'
  ],
  'autoprefixer': {
    'browsers': '> 5%'
  }
}
