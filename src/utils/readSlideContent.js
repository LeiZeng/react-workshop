import fs from 'fs'

export default slide => fs.readFileSync(slide, 'utf-8')
