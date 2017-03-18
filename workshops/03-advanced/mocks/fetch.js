const fetchMock = require('fetch-mock')

fetchMock.get('*', { hello: 'world' })

fetch('http://www.blabla.com')
  .then(response => response.json())
  .then(data => console.log(data))
