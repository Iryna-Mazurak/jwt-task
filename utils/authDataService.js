import axios from "axios";
// const BASE_URL = "http://10.0.2.2:4000/"";
const BASE_URL = "http://172.28.128.1:4000/";
const BASE_URL_AUTH = `${BASE_URL}auth/`;

async function authenticate(mode, login, password) {
  const url = `${BASE_URL_AUTH}${mode}`;

  const response = await axios.post(url, {
    username: login,
    password,
  });

  return response;
}

export async function createUser(login, password) {
  return authenticate("signup", login, password);
}

export async function login(login, password) {
  return authenticate("login", login, password);
}

export async function getNewToken(token) {
  const url = `${BASE_URL_AUTH}token`;
  return axios.post(url, { token });
}

export async function logout(refreshToken) {
  const url = `${BASE_URL_AUTH}logout`;
  const config = {
    token: refreshToken,
  };

  Object.defineProperty(config, "data", {
    value: { token: refreshToken },
    enumerable: false,
  });

  return axios.delete(url, config);
}

export async function getPosts(token) {
  const url = `${BASE_URL}posts`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
