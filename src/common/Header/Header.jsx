import "./Header.css";
import { Navigator } from "../Navigator/Navigator";
export const Header = () => {

    const token = false;
    const logOut = () => {
        console.log("log out")
    }

    return (
        <div className="headerDesign">
            <Navigator
                title={"HOME"} destination={"/"}
            />

            {
                token
                    ? (<div>

                        <Navigator title={"NICKNAME"} destination={"/profile"} />
                        <Navigator title={"LOG OUT"} onClick ={() => logOut()} />

                    </div>
                    ) : (
                    <div>

                        <Navigator title={"REGISTER"} destination={"/register"} />

                    </div>)
            }

        </div>
    );
}