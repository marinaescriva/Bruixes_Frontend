import "./Reserva.css";
import React, { useEffect, useState } from 'react';
import { getAllTables, getAllGames, createReserva } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton";
import { CInputProfile } from "../../common/CInputProfile/CInputProfile";
import { CDropDown } from "../../common/CDropDown/CDropDown";
import { CButtonNewMesa } from "../../common/CButtonNewMesa/CButtonNewMesa";
import { CDropDownG } from "../../common/CDropDownG/CDropDownG";

export const Reserva = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};

  const [tables, setTables] = useState([]);
  const [tablesData, setTablesData] = useState({
    fechaHoraInicio: "",
    idMesa: "",
    idJuego: "",
  });

  const [games, setGames] = useState([]);

  const inputHandler = (e) => {
    setTablesData(
      (prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      })
    )
  }

  const newReserva = async () => {
    console.log(tablesData.reserva, "reserva")
    console.log(token, "token")
    try {
      const response = await createReserva(token, tablesData);
      
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

          setTables(data.data);

        } catch (error) {
          console.error('Error fetching tables:', error);
        }
      };

      fetchTables();
    }
  }, [tables]);

  // useEffect(() => {
  //   console.log(tablesData ,"tablesdata")

  // }, [tablesData]);

  useEffect(() => {
    const fetchGames = async () => {
      
      try {
        const data = await getAllGames(token);

        console.log(data.data, "data")

        setGames(data.data);
        // console.log(data.data.nombre, "data nombre")
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
          name={"fechaHoraInicio"}
          placeholder={"DD/MM/YYYY HH:MM"}
          value={tablesData.fechaHoraInicio || ""}
          disabled={""}
          onChangeFunction={(e) => { inputHandler(e) }}
        />

        {tablesData.fechaHoraInicio !== "" &&
          <CDropDown
            buttonClass={""}
            dropdownClass={""}
            title={"idMesa"}
            items={tables}
            onChangeFunction={(e) => { inputHandler(e) }}
          />
        }

        {tablesData.idMesa !== "" &&
          <CDropDownG
            buttonClass={""}
            dropdownClass={""}
            title={"idJuego"}
            items={games}
            onChangeFunction={(e) => { inputHandler(e) }}
          />
        }

        <CButton
          className={"cButtonDesign"}
          title={"Reservar"}
          functionEmit={newReserva}
        />
      </div>


    </div>
  );
};