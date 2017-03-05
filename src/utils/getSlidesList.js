const path = require('path')
const vfs = require('vinyl-fs')

export default (callback) => {
  let slides = []
  vfs.src([
    'workshops/**/README.md',
    '!workshops/**/node_modules/**/*.md'
  ], { read: false })
  .on('data', (file) => {
    if (file.path) {
      slides.push(file.path)
    }
  })
  .on('end', () => callback(null, slides))
  .on('error', callback)
}
