class Authentication {
  constructor({ url, headers}) {
    this._generalUrl = url;
    this._headers = headers;
    this._token = null;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  _request(endpoint, headers, options) {
    return fetch(`${this._generalUrl}${endpoint}`, { ...options, headers: headers }).then(this._checkResponse);
  }

  pushRegistration(data) {
    return this._request('/signup', this._headers, {
      method: 'POST',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    });
  }

  pushLogin(data) {
    return this._request('/signin', this._headers, {
      method: 'POST',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
    .then(res => {
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    })
  }

  pullDataAuth() {
    return this._request('/users/me',
    {...this.headers, 'Authorization' : `Bearer ${this._token}`});
  }

  setToken(token) {
    this._token = token;
    localStorage.setItem('jwt', token);
  }

}

const serverConfig = {
  url: 'https://api.web.portfolio.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
};

const authenticationApi = new Authentication(serverConfig);

export default authenticationApi;
