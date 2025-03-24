export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async getUserInfo() {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async updateUserProfile(data) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async updateAvatar(data) {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async addNewCard(data) {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async deleteCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async likeCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }

  async dislikeCard(cardId) {
    try {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._checkResponse(res);
    } catch (error) {
      return Promise.reject(`Network error: ${error.message}`);
    }
  }
}