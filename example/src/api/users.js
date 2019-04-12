const baseUrl = 'https://jsonplaceholder.typicode.com';

const users = {
  get(fetchParams = {}){
    return fetch(`${baseUrl}/users`, fetchParams)
  },

  getId(id) {
    return fetch(`${baseUrl}/users/${id}`);
  },

  post({ username, email }) {
    return fetch(`${baseUrl}/users`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
      }),
    });
  },

  deleteId(id) {
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE',
    });
  },

  putId(id, { username, email }) {
    return fetch(`${baseUrl}/users/${id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'PUT',
      body: JSON.stringify({
        username,
        email,
      }),
    });
  },

  getError() {
    return fetch(`${baseUrl}/usersx`);
  },
};

export default users;
