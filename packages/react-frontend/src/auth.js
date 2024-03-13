import Cookies from "js-cookie";
import { AZURE_DOMAIN } from "./config";


export function loginUser(creds) {
  return fetch(`${AZURE_DOMAIN}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          `Login Error ${response.status}: ${response.statusText}`
        );
      }
    })
    .then((payload) => {
      Cookies.set("token", payload.token, {
        expires: 1,
        secure: true
      });
      return payload;
    })
    .catch((error) => {
      console.error("Error during login:", error);
      throw error;
    });
}

export function signupUser(creds) {
  const promise = fetch(`${AZURE_DOMAIN}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        // Throw an error with the status and statusText
        throw new Error(
          `Signup Error ${response.status}: ${response.statusText}`
        );
      }
    })
    .then((payload) => {
      Cookies.set("token", payload.token, { secure: true });
    })
    .catch((error) => {
      // Rethrow the error to be caught by the caller
      throw error;
    });

  return promise;
}

export function addAuthHeader(otherHeaders = {}, token) {
  if (!token) {
    return otherHeaders;
  } else {
    return {
      ...otherHeaders,
      Authorization: `Bearer ${token}`
    };
  }
}
