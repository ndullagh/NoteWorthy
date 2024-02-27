// pages/about.js

import React, { useState } from "react";
import '../styles/login.css'

export default function SignIn() {

  const [action,setAction] = useState("Login");

  return (
    <center>
      <div className="wrapper">
        <form action="">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            {action==="Login"?<div></div>:<div className="input"><input type="text" placeholder="Name" required /></div>}
            <div className="input">
              <input type="text" placeholder="Email" required />
            </div>
            <div className="input">
              <input type="password" placeholder="Password" required />
            </div>
          </div>

          {action==="Sign Up"?<div></div>:<div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>}

          <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
          </div>

          {action==="Sign Up"?<div></div>:<div className="register-link">
            <p>Do not have an account? <a href="#">Register</a></p>
          </div>}
        </form>

      </div>
    </center>
  );
}
