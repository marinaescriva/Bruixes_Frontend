import { useNavigate } from "react-router-dom";
import "./AdminPannel.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { GetUsers, deleteUser } from "../../services/apiCalls";


export const AdminPannel = () => {

    const navigate = useNavigate();
    const rdxUser = useSelector(userData);

    const [users, setUsers] = useState([]);
    const token = rdxUser?.credenciales?.token;

    useEffect(() => {
        if (rdxUser?.credenciales?.user?.id !== 1) {
            navigate("/");
        }
    }, [rdxUser]);

    useEffect(() => {
        if (users.length === 0) {
            const bringUsers = async () => {
                const fetchUsers = await GetUsers(rdxUser?.credenciales?.token);
                setUsers(fetchUsers.data);
            };

            bringUsers();
        }
    }, [users]);

    const deletingUser = async (id) => {
        try {
            await deleteUser(token, id);
            setUsers([]);
        } catch (error) {
            console.log(error, "error");
        }
    };

    return (
        <div className="adminPannelDesign">
            <div className="buttonPannel">
                <div className="directGames" onClick={() => navigate("/games")}>Ver juegos</div>
                <div className="directTables" onClick={() => navigate("/tables")}>Ver mesas</div>
                <div className="directTables" onClick={() => navigate("/reservas")}>Ver reservas</div>
            </div>

            <div className="allReservasPannelDesign">
            <div className="titleBackground"> TODOS LOS USUARIOS</div>
                    <div className="adminPannelAllUsers">
                        {users.map((user) => (

                            <div key={user.id} className="userDesign">
                                <div className="userNombreDesign">{user.nombre}</div>
                                <div className="userEmailDesign">{user.email}</div>
                                <div className="userBorrar" onClick={() => deletingUser(user.id)}> Borrar </div>
                            </div>

                        ))}
                    </div>
                </div>
        </div>
    );
};