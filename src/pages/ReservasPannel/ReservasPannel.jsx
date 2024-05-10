import "./ReservasPannel.css";
import { useDispatch, useSelector } from "react-redux";

import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAllReservas, deleteReservaById } from "../../services/apiCalls";

export const ReservasPannel = () => {

    const rdxUser = useSelector(userData); ///
    const token = rdxUser?.credenciales?.token; ////
    const navigate = useNavigate();

    const [loadedData, setLoadedData] = useState(false);

    const [reservaInfo, setReservaInfo] = useState([]);

    const [reservaInfoData, setReservaInfoData] = useState({
        idUsuario: "",
        idMesa: "",
        idJuego: "",
        idEvento: "",
        fechaHoraInicio: ""
    });

    useEffect(() => {
        const getMyReservasInfo = async () => {

            try {
                const fetched = await getAllReservas(token)
                setReservaInfo(fetched.data)

            } catch (error) {
                console.log(error)
            }
        }
        getMyReservasInfo()
    }
        , [loadedData, token])
    


    //////////////////////

    const deletingReserva = async (reservaId) => {

        try {

            const fetched = await deleteReservaById(token, reservaId)

            if (fetched.success) {
                setReservaInfo(reservaInfo.filter(item => item.id !== reservaId))

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="reservasPannelDesign">
                <div className="buttonPannel">
                    <div className="directUsers" onClick={() => navigate("/admin")}>Ver usuarios</div>
                    <div className="directGames" onClick={() => navigate("/games")}>Ver juegos</div>
                    <div className="directTables" onClick={() => navigate("/tables")}>Ver mesas</div>
                </div>
                
                <div className="allReservasPannelDesign">
                <div className="titleBackground"> TODAS LAS RESERVAS</div>
                    <div className="reservasDesignAll">
                        {reservaInfo.length > 0
                            ? (
                                reservaInfo.map((reserva) => {
                                    return (
                                        <div className="reservasDesign" key={reserva.id}>
                                            <div>Usuario {reserva.idUsuario}</div>
                                            <div>Mesa {reserva.idMesa}</div>
                                            <div>Juego {reserva.idJuego}</div>
                                            <div>{reserva.idEvento}</div>
                                            <div>{reserva.fechaHoraInicio}</div>
                                            <div className="reservaBorrar" onClick={() => deletingReserva(reserva.id)}> Borrar </div>
                                        </div>
                                    )
                                })
                            )
                            : (<div>no hay reservas </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
            )
}