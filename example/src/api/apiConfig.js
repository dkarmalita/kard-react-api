const baseUrl = 'https://jsonplaceholder.typicode.com';

const apiConfig = {
  getUserList: (fetchParams = {}) => fetch(`${baseUrl}/users`, fetchParams),

  getUser(id) {
    return fetch(`${baseUrl}/users/${id}`);
  },

  createUser({ username, email }) {
    return fetch(`${baseUrl}/users`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
      }),
    });
  },

  deleteUser(id) {
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE',
    });
  },

  updateUser(id, { username, email }) {
    return fetch(`${baseUrl}/users/${id}`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'PUT',
      body: JSON.stringify({
        username,
        email,
      }),
    });
  },

  getApiError() {
    return fetch(`${baseUrl}/usersx`);
  },
};

export default apiConfig;
