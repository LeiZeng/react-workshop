import React from 'react'

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    return { slide: req.context.slide }
  }
  render () {
    return <div>
        <textarea style={{ visibility: 'hidden' }} id="source" value={this.props.slide}/>
        <script src="https://gnab.github.io/remark/downloads/remark-latest.min.js"/>
        <script>
          {'var slideshow = remark.create();'}
        </script>
    </div>
  }
}
