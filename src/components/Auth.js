const BASE_URL = 'https://auth.nomoreparties.co';

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то сломалось. Ошибка: ${res.status}`);
}

export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(res => checkResult(res))
  .catch((err) => console.log(err))
}; 

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(res => checkResult(res))
  .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkResult(res))
  .catch(err => console.log(err))
}
