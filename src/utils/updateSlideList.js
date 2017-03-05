import fs from 'fs'

export default (slides) => {
  return slides.reduce((result, slide) => {
    const slideId = slide.replace(/^.*workshops\//i, '').replace(/\/README\.md$/i, '')
    result[slideId] = slide
    return result
  }, {})
}
