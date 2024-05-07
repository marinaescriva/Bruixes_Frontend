import "./Reserva.css";
import React, { useEffect, useState } from 'react';
import { getAllTables, getAllGames } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton";
import { CButtonNewMesa } from "../../common/CButtonNewMesa/CButtonNewMesa";

export const Reserva = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  const [tables, setTables] = useState([]);
  const [games, setGames] = useState([]);

  const handleReserveClick = (id_mesa) => {
    console.log("Mesa reservada:", id_mesa);
    // Aquí puedes realizar cualquier acción adicional que desees con el ID de la mesa
};

const id_mesa = handleReserveClick();

  useEffect(() => {

    const fetchTables = async () => {

      try {
        const data = await getAllTables(token);
        // console.log(data, "data")
        // console.log(data.data, "data.data")

        setTables(data.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

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
        {tables.map((table) => (
          <div className="mesaDesign" key={table.id}>
            <div > {table.id}</div>
            <div >
              <CButtonNewMesa
                onClick={() => handleReserveClick(table.id)}
                title={"Reservar"}
              />
            </div>
            <div> {table.isAvailable}</div>
          </div>
        ))}
      </div>
      if{(id_mesa) !== null} ?
      <div className="gamesDesign">
        {games.map((game) => (
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
        ))}
      </div>
      : (null)
    </div>
  );
};