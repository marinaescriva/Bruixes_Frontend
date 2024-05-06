import { useState, useEffect } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";

import "./Register.css";

export const Register = () => {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    
    setUser(
      (prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const registerMe = () => {
    console.log(user,"registerMe");
  }

  return (
    <div className="registerDesign">
      <pre>{JSON.stringify(user, null, 2)}  </pre>
      <CInput
        className={"inputDesign"}
        type={"text"}
        name={"nombre"}
        placeholder={"nombre"}
        value={user.nombre || ""}
        onChangeFunction={(e) => inputHandler(e)}
      />
      <CInput
        className={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={"email"}
        value={user.email || ""}
        onChangeFunction={(e) => inputHandler(e)}
      />
      <CInput
        className={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={"password"}
        value={user.password || ""}
        onChangeFunction={(e) => inputHandler(e)}
      />
      <CButton
      className={"cButtonDesign"}
      title={"REGISTER"}
      functionEmit={registerMe}
      />
    </div>
  )
}