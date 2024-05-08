import "./Reserva.css";
import React, { useEffect, useState } from 'react';
import { getAllTables, getAllGames, createReserva } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton";
import { CInputProfile } from "../../common/CInputProfile/CInputProfile";
import { CDropDown } from "../../common/CDropDown/CDropDown";
import { CButtonNewMesa } from "../../common/CButtonNewMesa/CButtonNewMesa";
import e from "cors";

export const Reserva = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  
  const [fechaInicio, setFechaInicio] =useState([]);
  const [fechaInicioData, setFechaInicioData] = useState({
    fechaInicio: "",
  });

  const [tables, setTables] = useState([]);
  const [tablesData, setTablesData] = useState({
    id: "",
    fechaInicio: "",
  });

  const [games, setGames] = useState([]);
  const [gamesData, setGamesData] = useState({
    id: "",
    jugadores: "",
    isAvailable: "",
  });

  const inputHandlerTime = (e) => {
    setFechaInicioData(
      (prevState) => ({
        ...prevState,
      fechaInicio: e.target.value,
      })
    )
    console.log(fechaInicioData.fechaInicio, "fecha es esto")

  }

  const inputHandler = (e) => {
   
    setTablesData(
      (prevState) => ({
        ...prevState,
        id_mesa: e.target.value,
        fechaInicio: e.target.value,
      })
    )
    console.log(tablesData.id_mesa, "id_mesa")

  }
  // const id_mesa = tablesData.id_mesa;
  // console.log(id_mesa, "id_mesa");

  
  const inputHandler2 = (e) => {
    setGamesData(
      (prevState) => ({
        ...prevState,
        id_juego: e.target.value,
      })
    )
    console.log(gamesData.id_juego, "id_juego")

  }

  const newReserva = async () => {
    try {
      const response = await createReserva(tokenStorage, tablesData);
      const reservasOld = Reserva;
      reservasOld.push(response);
      setTables(reservasOld);

      console.log("Reserva creada:", response);
    } catch {
      console.log("Error al crear la reserva");
    }
  }

  useEffect(() => {
    if (tables.length === 0) {
      const fetchTables = async () => {

        try {
          const data = await getAllTables(token);
          console.log(data, "data")

          setTables(data.data);

        } catch (error) {
          console.error('Error fetching tables:', error);
        }
      };

      fetchTables();
    }
  }, [tables]);

  console.log("Tables:", tables);
  console.log(tablesData.id_mesa, "id_mesa con idmesa")
  // console.log(juegosData.id_juego, "id_juego con idjuego")
  

  useEffect(() => {
    const fetchGames = async () => {

      try {
        const data = await getAllGames(token);

        setGames(data.data);
      } catch (error) {
        console.error('Error fetching games', error);
      }
    };

    fetchGames();
  }, []);


  return (
    <div>
      <h2>Reserva tu mesa</h2>
      <div className="mesasDesign">

        <CInputProfile
          className={"inputDesignProfile"}
          type={"date"}
          name={"fechaInicio"}
          placeholder={"DD/MM/YYYY HH:MM"}
          value={tablesData.fechaInicio || ""}
          disabled={""}
          onChangeFunction={(e) => inputHandlerTime(e)}
        />

        <CDropDown
          buttonClass={""}
          dropdownClass={""}
          title={"mesas"}
          items={tables}
          onChangeFunction={(e) => {inputHandler(e) }}
        />
      </div>
      <div className="gamesDesign">

      <CInputProfile
          className={"inputDesignProfile"}
          type={"date"}
          name={"fechaInicio"}
          placeholder={"DD/MM/YYYY HH:MM"}
          value={tablesData.fechaInicio || ""}
          disabled={""}
          onChangeFunction={(e) => inputHandler2(e)}
        />

        <CDropDown
          buttonClass={""}
          dropdownClass={""}
          title={"juegos"}
          items={games}
          onChangeFunction={(e) => {inputHandler2(e) }}
        />

        {/* {games.map((game) => (
          <div className="gameDesign" key={game.id}>
            <div > {game.id}</div>
            <div >
              <CButton
                className=""
                title={game.nombre}
              />
            </div>
            <div> {game.jugadores}</div>
          </div>
        ))} */}
      </div>

      <CButton
        className={"buttonDesign"}
        title={"Reservar"}
        onClickFunction={newReserva}
      />
    
    </div>
  );
};