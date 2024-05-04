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
                title={"home"}
                destination={"/"}
            />

            {
                token
                    ? (<div>

                        <Navigator title={"nickname"} destination={"/profile"} />
                        <Navigator title={"log out"} onClick ={() => logOut()} />

                    </div>
                    ) : (
                    <div>

                        <Navigator title={"register"} destination={"/register"} />

                    </div>)
            }

        </div>
    );
}