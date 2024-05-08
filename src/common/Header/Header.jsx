import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
import { useSelector , useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateCriteria } from "../../app/slices/searchSlice";
import { userData, logout} from "../../app/slices/userSlice";
export const Header = () => {

    const rdxUser = useSelector(userData);

    const dispatch = useDispatch();

    useEffect(() => {
       
      }, [rdxUser]);

    const [criteria, setCriteria] = useState("")

    const searchHandler = (e) => {
        setCriteria(e.target.value)
      }
    
      useEffect(() => {
        if (criteria !== "") {
         
          dispatch(updateCriteria(criteria))
        }
      }, [criteria])

    // console.log(rdxUser, "rdxUser")
    // console.log(rdxUser?.credenciales?.token, "token")
    // console.log(rdxUser?.credenciales?.user?.id_role, "id_role")

    return (
        <div className="d-flex col m-9 justify-content-center align-items-center headerDesign">
            <Navigator
                title={"HOME"} destination={"/"}
            />

            {
                rdxUser?.credenciales?.token
                    ? (<div className= "d-flex col m-1 justify-content-center align-items-center" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                        <Navigator title={rdxUser.credenciales.user.nombre} destination={"/profile"} />
                        

                        {(rdxUser?.credenciales?.user?.id_role === 1)
                            ? <Navigator path="/admin" title="Gestión" />
                            : null
                        }

                        <Navigator title={"Reserva"} destination={"/reserva"} />

                        <div onClick={() => dispatch(logout({ credenciales: "" , isRegistered: false}))}>
                            <Navigator path="/" title={"Log out"} />
                        </div>

                    </div>
                    ) : (
                        <div className="authMenu" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                            <Navigator title={"REGISTER"} destination={"/register"} />
                            <Navigator title={"LOGIN"} destination={"/login"} />

                        </div>)
            }

        </div>
    );
}