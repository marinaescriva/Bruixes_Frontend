import { useState, useEffect } from "react";
import { CInput } from "../../common/CInput/Cinput";
import { CButton } from "../../common/CButton/CButton";
import { validacion } from "../../utils/functions";

import "./Register.css";


export const Register = () => {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    nombreError: "",
    emailError: "",
    passwordError: "",
  });

  const [msgError, setMsgError] = useState("");

  const inputHandler = (e) => {

    setUser(
      (prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }))
  }

  const checkError = (e) => {
    const error = validacion(e.target.name , e.target.value)
    console.log(error)
  }

  const registerMe = async () => {
    try {

      for (let elemento in user) {
        if (user[elemento] === "") {
          throw new Error("Todos los campos deben estar llenos")
        }
      }

      console.log("?????")
      const fetched = await RegisterUser()
      console.log(fetched)

    } catch (error) {
      setMsgError(error.message)
    }

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
        onBlurFunction={(e) => checkError(e)}
      />
      {userError.nombreError}
      <CInput
        className={"inputDesign"}
        type={"email"}
        name={"email"}
        placeholder={"email"}
        value={user.email || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
       {userError.emailError}
      <CInput
        className={"inputDesign"}
        type={"password"}
        name={"password"}
        placeholder={"password"}
        value={user.password || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
       {userError.passwordError}
      <CButton
        className={"cButtonDesign"}
        title={"REGISTER"}
        functionEmit={registerMe}
      />
      {msgError}
    </div>
  )
}