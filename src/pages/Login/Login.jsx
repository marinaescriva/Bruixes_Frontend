import { useState } from 'react';
import { CInput } from '../../common/CInput/Cinput';
import { CButton } from '../../common/CButton/CButton';
import {validacion} from '../../utils/functions';
import {decodeToken} from  'react-jwt';
import {loginUser} from '../../services/apiCalls';
import {login} from '../../app/slices/userSlice';
import {useDispatch} from 'react-redux';	


import { useNavigate } from "react-router-dom";
import './Login.css'

export const Login = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [credenciales, setCredenciales] = useState({
    email: "",
    password: ""
})

const [credencialesError, setCredencialesError] = useState({
    emailError: "",
    passwordError: ""
})

const [msgError, setMsgError] = useState("");

const inputHandler = (e) => {
    setCredenciales(
        (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
}

const checkError = (e) => {
    const error = validacion(e.target.name, e.target.value);

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }))
  }

const loginMe = async () => {
    try {
   
        
        for (let elemento in credenciales) {
          if (credenciales[elemento] === "") {
            throw new Error("Todos los campos deben estar llenos")
          }
        }
      
        const fetched = await loginUser(credenciales)

        const decodificado  = decodeToken(fetched.token) 

        const passport = {
            token: fetched.token,
            user: decodificado
        }

        console.log(passport, "passport");
        console.log(credenciales, "credenciales");

        dispatch(login({ credenciales: passport }));

        setTimeout(() => {
          navigate("/")
        }, 800)
  
      } catch (error) {
        setMsgError(error.message)
      }

      console.log(credenciales.email, "credenciales.email")
    
}
    return (
        <div className="d-flex justify-content-center flex-column align-items-center loginDesign"> 
        <CInput
        className={`inputDesign ${credencialesError.emailError !== "" ? "inputDesignError" : ""}`}
        type={"email"}
        name={"email"}
        placeholder={"email"}
        value={credenciales.email || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.emailError}</div>

        <CInput 
        className={`inputDesign ${credencialesError.passwordError !== "" ? "inputDesignError" : ""}`}
        type={"password"}
        name={"password"}
        placeholder={"password"}
        value={credenciales.password || ""}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
        />
        <div className="error">{credencialesError.passwordError}</div>

        <CButton
        className={"cButtonDesign"}
        title={"LOGIN"}
        functionEmit={loginMe}
        />
        <div className="error">{msgError} </div>
        </div>

    )
}