import "./Tables.css";
import React, { useEffect, useState } from 'react';
import { getAllTables, deleteTable } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButtonNewGame } from "../../common/CButtonNewGame/CButtonNewGame";
import { useNavigate } from "react-router-dom";

export const Tables = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

//   const handleReserveClick = (id_mesa) => {
//     console.log("Mesa reservada", id_mesa);
//   };


  useEffect(() => {
    if (tables.length === 0) {
      const fetchTables = async () => {
        try {
          const data = await getAllTables(token);

          setTables(data.data);
        } catch (error) {
          console.error('Error fetching tables', error);
        }
      };

      fetchTables();
    }
  }, [tables]);

  const deletingTable = async (id) => {
    try {
      await deleteTable(token, id);
      setTables([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <div className="gamesDesign">
        <div className = "botonesRedirect">
        <div className="gameBorrar" onClick={() => navigate("/admin")}>Ver usuarios</div>
        <div className="gameBorrar" onClick={() => navigate("/games")}>Ver juegos</div>
        </div>

        <div className="allUsers">
          {tables.map((table) => (
            <div className="gameDesign" key={table.id}>

              <div className="gameNombreDesign"> {table.id}</div>

              <div className="gameBorrar" onClick={() => deletingTable(table.id)}> Borrar </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};