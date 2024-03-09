import Cookies from "js-cookie";
import { AZURE_DOMAIN } from "./config";



export function loginUser(creds) {
  const promise = fetch(`${AZURE_DOMAIN}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((payload) => {
            Cookies.set("token",payload.token, { secure: true })
          });
      } else {
        `Login Error ${response.status}: ${response.data}`
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Error status code:", error.statusCode);
    });

  return promise;
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
        response
          .json()
          .then((payload) => {
            Cookies.set("token",payload.token, { secure: true })
          });
      } else {
        console.log(`Signup Error ${response.status}: ${response.data}`)
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Error status code:", error.statusCode);
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

