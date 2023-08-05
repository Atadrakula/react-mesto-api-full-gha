class Api {
  constructor({ url, headers }) {
    this._generalUrl = url;
    this._headers = headers;
  }

  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }

  _request(endpoint, options) {
    return fetch(`${this._generalUrl}${endpoint}`, { ...options, headers: this._headers }).then(this._checkResponse);
  }

  pullProfileInfo() {
    return this._request(`/users/me`);
  }

  pullCardInfo() {
    return this._request(`/cards`);
  }

  patchProfileInfo(data) {
    return this._request(`/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.username,
        about: data.useractivity
      })
    });
  }

  pushCardInfo(data) {
    return this._request(`/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE'
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT'
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE'
    });
  }

  toggleLikeCard(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }

  pushAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      })
    });
  }
}

const serverConfig = {
  url: 'https://api.web.portfolio.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
};

const api = new Api(serverConfig);

export default api;
