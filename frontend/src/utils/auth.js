export const BASE_URL = "https://api.mestokd.students.nomoredomainsrocks.ru";

const checkRequestResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject("Ошибка");
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkRequestResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(checkRequestResponse);
};

export const getToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkRequestResponse);
};
