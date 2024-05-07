import "./Reserva.css";
import React, { useEffect, useState } from 'react';
import { getAllTables } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";

export const Reserva = () => {
  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAllTables(token);
        console.log(data, "data")
        console.log(data.data, "data.data")
        // console.log(tables, "tables")
        // console.log(table, "table")

        setTables(data.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);


  return (
    <div>
      <h2>Lista de Mesas</h2>
      <div className="mesasDesign">
        {tables.map((table) => (
          <div className="mesaDesign" key={table.id}>

            <div > {table.id}</div>
            <div > button </div>
            <div> {table.isAvailable}</div>
          </div>
        ))}

      </div>
    </div>
  );
};