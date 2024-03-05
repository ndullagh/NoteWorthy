//import { useState } from "react";


  export const INVALID_TOKEN = "INVALID_TOKEN";
 

  export function loginUser(creds, setToken) {
    const promise = fetch(`http://localhost:8000/login`, {
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
              setToken(payload.token);
              console.log(payload.token)
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

  export function signupUser(creds, setToken) {
    const promise = fetch(`http://localhost:8000/signup`, {
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
              setToken(payload.token)
              console.log(payload.token)
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
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

 