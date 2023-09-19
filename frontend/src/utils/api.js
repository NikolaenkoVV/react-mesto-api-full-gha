class Api {
  constructor({ serverUrl, headers }) {
    this.serverUrl = serverUrl;
    this.headers = headers;
  }

  _checkRequestResponse = (res) => {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject("Ошибка");
  };

  getServerUserInfo(token) {
    return fetch(`${this.serverUrl}/users/me`, {
      method: "GET",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
    }).then(this._checkRequestResponse);
  }

  getServerInitialCards(token) {
    return fetch(`${this.serverUrl}/cards`, {
      method: "GET",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
    }).then(this._checkRequestResponse);
  }

  setServerUserInfo(data, token) {
    return fetch(`${this.serverUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkRequestResponse);
  }

  addNewPlace(data, token) {
    return fetch(`${this.serverUrl}/cards`, {
      method: "POST",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRequestResponse);
  }

  setServerUserAvatar(data, token) {
    return fetch(`${this.serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRequestResponse);
  }

  deleteCard(data, token) {
    return fetch(`${this.serverUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
    }).then(this._checkRequestResponse);
  }

  addPlaceLike(data, token) {
    return fetch(`${this.serverUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
    }).then(this._checkRequestResponse);
  }

  changePlaceLikeStatus(place, isLiked, token) {
    if (isLiked) {
      return this.removePlaceLike(place, token);
    }
    return this.addPlaceLike(place, token);
  }

  removePlaceLike(data, token) {
    return fetch(`${this.serverUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: { ...this.headers, authorization: `Bearer ${token}` },
    }).then(this._checkRequestResponse);
  }
}

const api = new Api({
  serverUrl: "https://api.mestokd.students.nomoredomainsrocks.ru",
  headers: {
    // authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default api;
