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
      <div className="tablesDesign">
        <div className = "buttonPannel">
        <div className="directUsers" onClick={() => navigate("/admin")}>Ver usuarios</div>
        <div className="directGames" onClick={() => navigate("/games")}>Ver juegos</div>
        <div className="directTables" onClick={() => navigate("/reservas")}>Ver reservas</div>
        </div>

        <div className="allTables">
          {tables.map((table) => (
            <div className="tableDesign" key={table.id}>

              <div className="tableNombreDesign"> {table.id}</div>

              <div className="tableBorrar" onClick={() => deletingTable(table.id)}> Borrar </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};