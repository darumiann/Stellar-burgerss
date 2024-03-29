import { getCookie } from "./getCookie";
import { TIngredient } from "./types";
export const URL = "https://norma.nomoreparties.space/api";

export const WS_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_PROFILE_URL = "wss://norma.nomoreparties.space/orders";

export function getIngredients() {
  return fetch(`${URL}/ingredients`).then(checkResponse);
}

export const request = (path: string, options: RequestInit) => {
  return fetch(`${URL}${path}`, options).then(checkResponse);
};

export function checkResponse<T>(res: Response) {
  if (res.ok) {
    return res.json() as any;
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const refreshToken = () => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchOrderData = (ingredients: TIngredient[] | string[]) => {
  return fetch(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);
};

// export const loginRequest = async (form) => {
//   return await fetch(`${URL}/auth/login`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       email: form.email,
//       password: form.password,
//     }),
//   });
// };

// export const registerRequest = async (form) => {
//   return await fetch(`${URL}/auth/register`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       name: form.name,
//       email: form.email,
//       password: form.password,
//     }),
//   });
// };

// export const passwordResetRequest = async (form) => {
//   return await fetch(`${URL}/password-reset/reset`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       password: form.password,
//       token: form.token,
//     }),
//   });
// };

// export const passwordRecoveryRequest = async (form) => {
//   return await fetch(`${URL}/password-reset`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       email: form.email,
//     }),
//   });
// };

// export const logoutRequest = async (user) => {
//   return await fetch(`${URL}/auth/logout`, {
//     method: "POST",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + getCookie("token"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       token: user.refreshToken,
//     }),
//   });
// };

// export const userDataRequest = async () => {
//   return await fetch(`${URL}/auth/user`, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + getCookie("token"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   });
// };

export const fetchOrderDataByNumber = (number: number) => {
  return fetch(`${URL}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};


// export const updateDataRequest = async (form) => {
//   return await fetch(`${URL}/auth/user`, {
//     method: "PATCH",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + getCookie("token"),
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify({
//       name: form.name,
//       email: form.email,
//       password: form.password,
//     }),
//   });
// };