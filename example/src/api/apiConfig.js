const baseUrl = `https://jsonplaceholder.typicode.com`;

export const apiConfig = {
  getUserList: (fetchParams={}) => {
    return fetch(`${baseUrl}/users`, fetchParams)
  },

  getUser: function(id){
    return fetch(`${baseUrl}/users/${id}`)
  },

  createUser: function({ username, email }){
    return fetch(`${baseUrl}/users`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
      })
    })
  },

  deleteUser: function(id){
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE'
    })
  },

  updateUser: function(id, { username, email }){
    return fetch(`${baseUrl}/users/${id}`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'PUT',
      body: JSON.stringify({
        username,
        email,
      })
    })
  },

  getApiError: function(){
    return fetch(`${baseUrl}/usersx`)
  },
}
