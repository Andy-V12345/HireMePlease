import { createContext, useState } from "react"
import ChildrenProp from "../props/ChildrenProp"
import AuthState from "../enums/AuthState"
import { initializeApp } from "firebase/app"
import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth"
import { firebaseConfig } from "../firebase/FirebaseConfig"

export interface AuthManagerContextType {
    state: AuthState,
    user: User | null,
    auth: Auth
}

export const AuthContext = createContext<AuthManagerContextType | null>(null)

export function AuthManager({children}: ChildrenProp) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [state, setState] = useState<AuthState>(AuthState.UNDEFINED)
    const [user, setUser] = useState<User | null>(null)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setState(AuthState.AUTHORIZED)
            setUser(user)
        }
        else {
            setState(AuthState.UNAUTHORIZED)
        }
    })

    return (
        <AuthContext.Provider value={{state, user, auth}}>
            {children}
        </AuthContext.Provider>
    )
}

