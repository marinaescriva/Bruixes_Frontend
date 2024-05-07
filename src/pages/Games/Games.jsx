import "./Games.css";
import React, { useEffect, useState } from 'react';
import { getAllGames} from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { CButtonNewGame } from "../../common/CButtonNewGame/CButtonNewGame";

export const Games = () => {

  const state = useSelector(userData);
  const token = state.credenciales.token || {};
  const [games, setGames] = useState([]);

  const handleReserveClick = (id_juego) => {
    console.log("Juego reservado:", id_juego);
    // Aquí puedes realizar cualquier acción adicional que desees con el ID de la mesa
};


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

     
      <div className="gamesDesign">
        {games.map((game) => (
          <div className="gameDesign" key={game.id}>

            <div > {game.id}</div>
            <div > 
              <CButtonNewGame
                onClick={() => handleReserveClick(game.id)}
                title={game.nombre}
              />
            </div>
            <div> {game.jugadores}</div>
          </div>
        ))}

      </div>
      </div>
  );
};