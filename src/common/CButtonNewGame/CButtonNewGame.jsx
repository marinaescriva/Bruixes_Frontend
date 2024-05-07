import "./CButtonNewGame.css";
import { useNavigate } from "react-router-dom";

export const CButtonNewGame = ({ onClick, title }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        navigate("/profile"); 
    };

    return (
        <div className="CButtonNewGameDesign" onClick={handleClick}>
            {title}
        </div>

    )
}