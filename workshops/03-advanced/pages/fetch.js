import { Component } from 'react'
import RadioGroup from '../components/RadioGroup'
import Checkbox from '../components/Checkbox'
import Text from '../components/Text'

export default class FetchPractice extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      fields: {},
      headers: {}
    }
  }
  handleFieldUpdate(key) {
    return (value) => {
      this.setState({
        fields: {
          ...this.state.fields,
          [key]: value
        }
      })
      return false
    }
  }
  addMoreHeader() {
    this.setState({
      headers: {
        ...this.state.header,
        [this.state.headerKey]: this.state.headerValue
      }
    })
  }
  setHeaderKey(headerKey) {
    this.setState({ headerKey })
  }
  setHeaderValue(headerValue) {
    this.setState({ headerValue })
  }
  getHeaders() {
    return (
      this.state.fields.hasHeaders ? (
        <div>
          {Object.keys(this.state.headers).map(header => (
            <div>{header} : {this.state.headers[header]}</div>
          ))}
          <Text onChange={value => this.setHeaderKey(value)}/>
          <Text onChange={value => this.setHeaderValue(value)}/>
          <input type="button" value="add more header" onClick={() => this.addMoreHeader()}/>
        </div>
      ) : null
    )
  }
  handleSubmit() {
    console.log(this.state);
    const {
      headers,
      fields: {
        url,
        credential,
        method,
        responseType
      }
    } = this.state
    fetch(url, {
      method,
      credential,
      headers
    }).then(response => {
      if (response.status > 400) {
        throw new Error(response)
      }
      if (responseType === 'json') {
        return response.json()
      }
      return response.text()
    }).then(json => console.log(json))
  }
  render() {
    return (
      <div>
        <h1>Fetch Practice</h1>
        <form action="POST">
          <div>
            <Text label="URL:" onChange={this.handleFieldUpdate('url')} />
          </div>
          <p>
            Method:
            <RadioGroup
              options={{
                'POST': 'POST',
                'GET': 'GET',
                'PUT': 'PUT',
                'DELETE': 'DELETE'
              }}
              name="method"
              onChange={this.handleFieldUpdate('method')}
            />
          </p>
          <p>
            Credential:
            <RadioGroup
              options={{
                default: 'Default',
                'same-origin': 'Same Origin',
                include: 'Include'
              }}
              name="credential"
              onChange={this.handleFieldUpdate('credential')}
            />
          </p>
          <p>
            Response Type:
            <RadioGroup
              options={{
                json: 'json',
                text: 'text'
              }}
              name="responseType"
              onChange={this.handleFieldUpdate('responseType')}
            />
          </p>
          <div>
            <label>
              Add Custom Headers
              <Checkbox onChange={this.handleFieldUpdate('hasHeaders')} />
            </label>
          </div>
          {this.getHeaders()}
          <input type="button" value="fetch it" onClick={evt => this.handleSubmit()}/>
        </form>
      </div>
    )
  }
}
