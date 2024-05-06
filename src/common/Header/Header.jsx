import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
export const Header = () => {

    const rdxUser = useSelector(userData);
    console.log(rdxUser, "rdxUser")
    console.log(rdxUser.credenciales.token, "token")
    console.log(rdxUser.credenciales.user.id_role, "id_role")

    return (
        <div className="headerDesign">
            <Navigator
                title={"HOME"} destination={"/"}
            />

            {
                rdxUser?.credenciales?.token
                    ? (<div>

                        <Navigator title={rdxUser.credenciales.user.nombre} destination={"/profile"} />
                        <Navigator title={"reservar"} destination={"/"} />

                        {(rdxUser.credenciales.user.id_role === 1)
                            ? <Navigator path="/admin" title="Super Admin" />
                            : null
                        }

                        <div onClick={() => dispatch(logout({ credenciales: "" }))}>
                            <Navigator path="/" title={"Log out"} />
                        </div>

                    </div>
                    ) : (
                        <div className="authMenu">

                            <Navigator title={"REGISTER"} destination={"/register"} />
                            <Navigator title={"LOGIN"} destination={"/login"} />

                        </div>)
            }

        </div>
    );
}