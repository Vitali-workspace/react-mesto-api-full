class Api {
  constructor(configApi) {
    this._profileInfoUrl = `${configApi.baseUrl}/users/me`;
    this._profileAvatarUrl = `${configApi.baseUrl}/users/me/avatar`;
    this._cardsUrl = `${configApi.baseUrl}/cards`;
    this._likeCardUrl = `${configApi.baseUrl}/cards/`;
  }

  // проверка на ошибки при отправке запроса на сервер
  _checkError(res) {
    if (!res.ok) {
      return Promise.reject(`произошла ошибка: ${res.status}`)
    }
    return res.json();
  }

  // загрузка карточек с сервера
  getInitialCards(token) {
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // загрузка данных профиля с сервера
  getProfileInfo(token) {
    return fetch(this._profileInfoUrl, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // отправка новых данных профиля на сервер
  changeProfileInfo(newProfileInfo, token) {
    return fetch(this._profileInfoUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: `${newProfileInfo.name}`, about: `${newProfileInfo.about}` }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // добавление новой карточки на сервер
  addCardServer(inputsInfo, token) {
    const { name, link } = inputsInfo;
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Удаление карточки на сервере.
  deleteCardServer(idCard, token) {
    return fetch(this._likeCardUrl + `${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Загрузка нового аватара на сервер
  addAvatarServer(link, token) {
    return fetch(this._profileAvatarUrl, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: `${link.avatar}` }),
      credentials: 'include',
    })
      .then(this._checkError);
  }

  // Добавление лайка на сервер
  changeLikeCardStatus(idCard, isLiked, token) {
    return fetch(this._likeCardUrl + `${idCard}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(this._checkError);
  }

}

const requestApi = new Api({
  baseUrl: 'https://api.mestoproject.vitali.nomoredomains.icu',
});

export default requestApi;

