export default (username, password) => fetch('/login', {
  method: 'POST', data: JSON.stringify({ username, password })
}).then(response => {
  if (response.status >= 400) {
    throw response
  }
  return response.json()
})
