class Api {
  constructor(configApi) {
    this._profileInfoUrl = `${configApi.baseUrl}/users/me`;
    this._profileAvatarUrl = `${configApi.baseUrl}/users/me/avatar`;
    this._cardsUrl = `${configApi.baseUrl}/cards`;
    this._likeCardUrl = `${configApi.baseUrl}/cards/`;
    this._headersProperty = configApi.headers;
  }

  // проверка на ошибки при отправке запроса на сервер
  _checkError(res) {
    if (!res.ok) {
      return Promise.reject(`произошла ошибка: ${res.status}`)
    }
    return res.json();
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: this._headersProperty,
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // загрузка данных профиля с сервера
  getProfileInfo() {
    return fetch(this._profileInfoUrl, {
      method: 'GET',
      headers: this._headersProperty,
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // отправка новых данных профиля на сервер
  changeProfileInfo(newProfileInfo) {
    return fetch(this._profileInfoUrl, {
      method: 'PATCH',
      headers: this._headersProperty,
      body: JSON.stringify({ name: `${newProfileInfo.name}`, about: `${newProfileInfo.about}` }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // добавление новой карточки на сервер
  addCardServer(inputsInfo) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headersProperty,
      body: JSON.stringify({ name: `${inputsInfo.name}`, link: `${inputsInfo.link}` }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Удаление карточки на сервере.
  deleteCardServer(idCard) {
    return fetch(this._likeCardUrl + `${idCard}`, {
      method: 'DELETE',
      headers: this._headersProperty,
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Загрузка нового аватара на сервер
  addAvatarServer(link) {
    return fetch(this._profileAvatarUrl, {
      method: 'PATCH',
      headers: this._headersProperty,
      body: JSON.stringify({ avatar: `${link.avatar}` }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Добавление лайка на сервер
  changeLikeCardStatus(idCard, isLiked) {
    return fetch(this._likeCardUrl + `${idCard}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headersProperty,
      credentials: 'include',
    })
      .then(this._checkError);
  }

}

const requestApi = new Api({
  baseUrl: 'https://api.mestoproject.vitali.nomoredomains.icu',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});

export default requestApi;

