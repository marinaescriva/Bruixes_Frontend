import "./Games.css";
import React, { useEffect, useState } from 'react';
import { getAllGames, deleteGame } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButtonNewGame } from "../../common/CButtonNewGame/CButtonNewGame";

export const Games = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  const [games, setGames] = useState([]);

  const handleReserveClick = (id_juego) => {
    console.log("Juego reservado:", id_juego);
  };


  useEffect(() => {
    if (games.length === 0) {
      const fetchGames = async () => {
        try {
          const data = await getAllGames(token);

          setGames(data.data);
        } catch (error) {
          console.error('Error fetching games', error);
        }
      };

      fetchGames();
    }
  }, [games]);

  const deletingGame = async (id) => {
    try {
      await deleteGame(token, id);
      setGames([]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <div className="gamesDesign">
        <div className = "botonesRedirect">
        <div className="gameBorrar" onClick={() => navigate("/admin")}>Ver usuarios</div>
        <div className="gameBorrar" onClick={() => navigate("/mesas")}>Ver mesas</div>
        </div>

        <div className="allUsers">
          {games.map((game) => (
            <div className="gameDesign" key={game.id}>

              <div className="gameNombreDesign"> {game.nombre}</div>

              <div className="gameBorrar" onClick={() => deletingGame(game.id)}> Borrar </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};