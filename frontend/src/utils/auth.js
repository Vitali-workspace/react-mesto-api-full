const BASE_URL = 'https://auth.nomoreparties.co';

function checkError(response) {
  const result = (response.ok)
    ? response.json()
    : Promise.reject(`произошла ошибка:${response.status}`);
  return result;
}


export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  }).then(err => checkError(err))

}


export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  }).then(err => checkError(err))
}


export function validationToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }).then(err => checkError(err));
}