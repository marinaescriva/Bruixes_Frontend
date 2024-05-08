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
        <div className="container-fluid">
        <div className="row justify-content-center align-items-center headerDesign">
            <Navigator
                title={"HOME"} destination={"/"}
            />

            {
                rdxUser?.credenciales?.token
                    ? (<div className= "d-flex justify-content-center align-items-center">

                        <Navigator title={rdxUser.credenciales.user.nombre} destination={"/profile"} />
                        
                        
                        {(rdxUser?.credenciales?.user?.id_role === 1)
                            ? <Navigator title="Gestión"  destination={"/admin"}/>
                            : null
                        }
                        
                        <Navigator title={"Reserva"} destination={"/reserva"} /> 

                        <div onClick={() => dispatch(logout({ credenciales: "" , isRegistered: false}))}>
                            <Navigator title={"Log out"} destination={"/"} />
                        </div>
                        
                    </div>
                    ) : (
                        <div className="authMenud-flex justify-content-center align-items-center">

                            <Navigator title={"REGISTER"} destination={"/register"} />
                            <Navigator title={"LOGIN"} destination={"/login"} />

                        </div>)
            }

        </div>
        </div>
    );
}