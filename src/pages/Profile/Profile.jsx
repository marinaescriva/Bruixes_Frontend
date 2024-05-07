import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { myProfile } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
import { validacion } from "../../utils/functions";
import { CInputProfile } from "../../common/CInputProfile/CInputProfile";


export const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUser = useSelector(userData); ///
  const token = rdxUser?.credenciales?.token; ////

  const [tokenStorage, setTokenStorage] = useState(rdxUser?.credenciales?.token);
  console.log(token, "token")
  console.log(rdxUser, "rdxUser")
  console.log( rdxUser?.credenciales?.user?.nombre, "nombre")

  const [loadedData, setLoadedData] = useState(false);
  const [write, setWrite] = useState("disabled");


  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [rdxUser])

  const searchHandler = (e) => {
    setCriteria(e.target.value)
  }

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",

  })

  const [userError, setUserError] = useState({
    nombreError: "",
    emailError: "",
    passwordError: ""
  })

  const [msgError, setMsgError] = useState("");

  const checkError = (e) => {
    const error = validacion(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };


  const inputHandler = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {

    if (!token) {
      navigate("/")

    }

  }, [token])

  useEffect(() => {
    const getmyProfile = async () => {
      try {

        const fetched = await myProfile(token)

        setUser({
          nombre: fetched.nombre,
          email: fetched.email,
          password: fetched.password
        })

        setLoadedData(true)

      } catch (error) {
        console.log(error)

      }
    }
    getmyProfile()
  }, [token, loadedData])

  const editProfile = async () => {

    try {

      const updatedUser = {
        ...user,
        nombre: user.nombre
      }
      const fetched = await updateProfile(token, updatedUser)

      setUser((prevState) => ({
        ...prevState,
        nombre: fetched.nombre || prevState.nombre,
        email: fetched.email || prevState.email
      }));

      setWrite("disabled")

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>  <div className="profileDesign">
      <div> {`Perfil de ${rdxUser.credenciales.user.nombre}`}</div>
      <CInputProfile
        className={`inputDesign ${userError.nombreError !== "" ? "inputDesignError" : ""}`}
        type={"text"}
        name={"nombre"}
        placeholder={"nombre"}
        value={user.nombre || ""}
        disabled={write}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.nombreError}</div>

      <CInputProfile
        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}`}
        type={"email"}
        name={"email"}
        placeholder={"email"}
        value={user.email || ""}
        disabled={write}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.emailError}</div>

      <CInputProfile
        className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""}`}
        type={"password"}
        name={"password"}
        placeholder={"* * * * * * * *"}
        value={user.password || ""}
        disabled={"disabled"}
        onChangeFunction={(e) => inputHandler(e)}
        onBlurFunction={(e) => checkError(e)}
      />
      <div className="error">{userError.passwordError}</div>

      <CButton
        className={"cButtonDesign"}
        title={write === "" ? "GUARDAR" : "EDITAR"}
        functionEmit={write === "" ? editProfile : () => setWrite("")}
      />

    </div>
    </>
  )
}