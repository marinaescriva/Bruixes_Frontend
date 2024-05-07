import "./CButtonNewReserva.css";
import { useNavigate } from "react-router-dom";

export const CButtonNewReserva = ({ path, title }) => {

    const navigate = useNavigate()
    return (
        <div className= "CButtonNewReservaDesign" onClick={() => navigate(path)}>{title}</div>

    )
}