import { useContext } from "react"
import { AuthContext } from "../components/AuthManager"
import { signOut } from "firebase/auth"

function HomePage() {

    const authContext = useContext(AuthContext)

    const logout = () => {
        signOut(authContext!.auth)
    }

    return(
        <div className="bg-white w-full h-full absolute flex justify-center">
            <div className="bg-white w-1/2 h-full">

            </div>
        </div>
    )
}

export default HomePage