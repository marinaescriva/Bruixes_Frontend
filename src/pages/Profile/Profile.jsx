import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from 'react';
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { myProfile, updateProfile, getMyreservas } from "../../services/apiCalls";
import { CButton } from "../../common/CButton/CButton";
// import { CButtonNewReserva } from "../../common/CButtonNewReserva/CButtonNewReserva";
import { validacion } from "../../utils/functions";
import { CInputProfile } from "../../common/CInputProfile/CInputProfile";
import { Reserva } from "../Reserva/Reserva";


export const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdxUser = useSelector(userData); ///
  const token = rdxUser?.credenciales?.token; ////

  const [tokenStorage, setTokenStorage] = useState(rdxUser?.credenciales?.token);
  const [loadedData, setLoadedData] = useState(false);
  const [write, setWrite] = useState("disabled");

  const [reservaInfo, setReservaInfo] = useState([]);

  const [reservaInfoData, setReservaInfoData] = useState({
    idUsuario: "",
    idMesa: "",
    idJuego: "",
    idEvento: "",
    fechaHoraInicio: ""
  });


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
    setUser((prevState) =>
    ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    );
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
      console.log(user, "user")

      const updatedUser = await updateProfile(
        rdxUser?.credenciales?.token,
        user
      )

      console.log(rdxUser.credenciales.user.nombre, "nombre")
      console.log(rdxUser.credenciales.user.email, "email")

      setUser(updatedUser);
      setLoadedData(false);
      setWrite("disabled");

      setUserError({
        nombreError: "",
        emailError: ""
      })

    } catch (error) {
      return error;
    }
    setLoadedData(false);
  }

  ///////////////////
  

  useEffect(() => {
    const getMyReservasInfo = async () => {

      try {
        const fetched = await getMyreservas(token)
        setReservaInfo(fetched.data)
      
      } catch (error) {
        console.log(error)
      }
    }
    getMyReservasInfo()
  }
    , [loadedData, token])
    console.log(reservaInfo, "ReservaInfo")

  return (
    <>  <div className="profileDesign">
      <div className="pannelProfile">
        <div className="tituloProfile"> {`Perfil de ${rdxUser.credenciales.user.nombre}`}</div>
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
      <div className="misReservasDesign">
        AQUI MIS RESERVAS
        <div >
        {reservaInfo.length > 0
          ? (
            reservaInfo.map((reserva) => {
              return (
                <div className="profileDesignBack" key={reserva.id}>
                  <div>{reserva.idMesa}</div>
                  <div>{reserva.juego.nombre}</div>
                  <div>{reserva.idEvento}</div>
                  <div>{reserva.fechaHoraInicio}</div>
                </div>
              )
            })
          )
          : (<div>no hay reservas </div>)
        }
        </div>
        {/* <CButtonNewReserva
          path={"/reserva"}
          title={"Nueva reserva"}>
      </CButtonNewReserva> */}
      </div>
    </div>
    </>
  )
}