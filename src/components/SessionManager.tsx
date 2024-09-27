import { useContext } from "react"
import { AuthContext } from "./AuthManager"
import AuthState from "../enums/AuthState"
import AuthPage from "../pages/AuthPage"
import HomePage from "../pages/HomePage"

function SessionManager() {
    const authContext = useContext(AuthContext)

    if (authContext?.state == AuthState.AUTHORIZED) {
        return (
            <HomePage />
        )
    }
    else if (authContext?.state == AuthState.UNAUTHORIZED) {
        return (
            <AuthPage />
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default SessionManager