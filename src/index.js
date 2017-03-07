import express from 'express'
import next from 'next'
import getSlidesList from './utils/getSlidesList'
import updateSlideList from './utils/updateSlideList'
import readSlideContent from './utils/readSlideContent'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  let slides = []
  let slidesContent = null
  getSlidesList((err, list = []) => {
    const server = express()

    slides = list
    slidesContent = updateSlideList(list)
    console.log('Get Slides:', JSON.stringify(slidesContent));

    server.get('/', (req, res) => {
      // Inject data to page component
      req.context = { slides }
      return app.render(req, res, '/')
    })

    server.get('/slide', (req, res, next) => {
      const slideId = req.query.id

      if (!slideId) {
        next(new Error('No slideId'))
      }
      const slide = readSlideContent(slidesContent[slideId])

      if (!slide) {
        next(new Error('No slide Found!'))
      }
      req.context = { slide }
      return app.render(req, res, '/slide')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(9000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:9000')
    })
  })
})
