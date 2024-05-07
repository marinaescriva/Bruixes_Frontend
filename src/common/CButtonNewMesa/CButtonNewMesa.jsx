import "./CButtonNewMesa.css";
import { useNavigate } from "react-router-dom";

export const CButtonNewMesa = ({ onClick, title }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate("/games"); 
    };

    return (
        <div className="CButtonNewMesaDesign" onClick={handleClick}>
            {title}
        </div>

    )
}