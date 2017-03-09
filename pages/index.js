import React from 'react'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return { slides: req.context.slides }
  }
  getSlideItem() {
    return (
      <ul>
        {this.props.slides.map((slide, key) => {
          const slideId = slide.replace(/^.*workshops\//i, '').replace(/\/README\.md$/i, '')
          return (
            <li key={key}>
              <a href={'\slide?id=' + slideId}>{slideId}</a>
            </li>)
          }
        ) || 'No slides.'}
      </ul>
    )
  }
  render () {
    return <div>
      <h1>React Workshop</h1>
      {this.getSlideItem()}
    </div>
  }
}
