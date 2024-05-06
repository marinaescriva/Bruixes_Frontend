import { useState, useEffect } from "react";
import { CInput } from "../../common/CInput/Cinput";

import "./Register.css";
export const Register = () => {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="registerDesign">

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

    </div>
  )
}