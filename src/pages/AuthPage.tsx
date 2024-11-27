/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import AuthTextInput from "../components/AuthTextInput";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { AuthContext } from "../components/AuthManager";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import ViewState from "../enums/ViewState";
import LoadingSpinner from "../components/LoadingSpinner";

enum Mode {
    SIGNIN = 1,
    SIGNUP
}

export default function AuthPage() {

    const [mode, setMode] = useState<Mode>(Mode.SIGNIN)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [state, setState] = useState<ViewState>(ViewState.DEFAULT)
    const [errorMsg, setErrorMsg] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmError, setConfirmError] = useState("")

    const authContext = useContext(AuthContext)

    const handleGoogleAuth = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(authContext!.auth, provider)
            .catch((error) => {
                console.log(error)
                setErrorMsg("Something went wrong please try again")
            })
    }

    const handleClick = () => {
        setState(ViewState.LOADING)

        const isEmailValid = validateEmail(email)

        if (mode == Mode.SIGNIN) {
            if (isEmailValid) {
                setEmailError("")
                login(email, password)
            }
            else {
                setState(ViewState.READY)
            }
        }
        else {
            const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword)
            const isPasswordValid = validatePassword(password)

            if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
                setEmailError("")
                setPasswordError("")
                setConfirmError("")
                signup(email, password)
            }
            else {
                setState(ViewState.READY)
            }
        }
    }

    const validateEmail = (email: string) => {
        const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailValidator.test(email)) {
            setEmailError("Please enter a valid email")
            return false
        }
        
        return true
    }

    const validatePassword = (password: string) => {
        const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!passwordValidator.test(password)) {
            setPasswordError("Passwords need to be at least 8 characters and have a number, a capital letter, a lowercase letter, and a special character")
            return false
        }

        return true
    }

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            setConfirmError("Your passwords don't match")
            return false
        }

        return true
    }

    const login = (email: string, password: string) => {
        signInWithEmailAndPassword(authContext!.auth, email, password)
            .then(() => {
                setState(ViewState.DEFAULT)
            })
            .catch((error) => {
                setState(ViewState.ERROR)
                if (error.code === "auth/invalid-credential") {
                    setErrorMsg("Invalid email and password")
                }
                else {
                    setErrorMsg("Something went wrong please try again")
                }
            })
    }

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(authContext!.auth, email, password)
            .then(() => {
                setState(ViewState.DEFAULT)
            })
            .catch((error) => {
                console.log(error)
                setState(ViewState.ERROR)

                if (error.code == "auth/email-already-in-use") {
                    setErrorMsg("This email is already taken")
                }
                else {
                    setErrorMsg("Something went wrong please try again")
                }
            })
    }

    const switchMode = () => {
        setErrorMsg("")
        setState(ViewState.DEFAULT)

        if (mode == Mode.SIGNIN) {
            setMode(Mode.SIGNUP)
        }
        else {
            setMode(Mode.SIGNIN)
        }
    }

    useEffect(() => {
        if (mode === Mode.SIGNIN) {
            if (email.trim() !== "" && password.trim() !== "") {
                setState(ViewState.READY)
            }
            else {
                setState(ViewState.DEFAULT)
            }
        }
        else {
            if (email.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "") {
                setState(ViewState.READY)
            }
            else {
                setState(ViewState.DEFAULT)
            }
        }
    }, [email, password, confirmPassword])

    return (
        <div className="sm:bg-secondary-gray bg-white w-full h-full absolute flex justify-center">
            <div className={`relative my-auto h-5/6 ${mode == Mode.SIGNIN ? `max-h-[575px]` : `max-h-[675px]`} w-full sm:w-1/2 md:max-w-[500px]`}>
                <div className="sm:bg-white rounded-[30px] my-auto h-full w-full p-[30px] sm:p-[45px] flex flex-col justify-between gap-8 overflow-y-scroll">
                    <h1 className="text-3xl font-black text-primary-gray">Hire Me Please</h1>

                    <AuthTextInput label={"Email"} placeholder={"hiremeplease@gmail.com"} value={email} setValue={setEmail} isSecure={false} isError={emailError !== ""} errorMsg={emailError} />
                    <AuthTextInput label={"Password"} placeholder={"Enter your password"} value={password} setValue={setPassword} isSecure={true} isError={passwordError !== ""} errorMsg={passwordError} />
                    {mode == Mode.SIGNUP ? 
                        <AuthTextInput label={"Confirm password"} placeholder={"Confirm your password"} value={confirmPassword} setValue={setConfirmPassword} isSecure={true} isError={confirmError !== ""} errorMsg={confirmError} />
                    :
                        null
                    }

                    {state == ViewState.ERROR ?
                        <div className="bg-red-200 p-3 border-2 border-red-400 rounded-[14px] text-sm text-red-400 font-semibold">
                            <p>{errorMsg}</p>
                        </div>
                    :
                        null
                    }


                    <div className="mt-3 flex flex-col gap-6 items-center w-full">
                        <div className="flex flex-col gap-2 items-center w-full">
                            <button onClick={() => handleClick()} className="bg-secondary-teal text-md w-full text-white font-bold h-[50px] rounded-xl hover:opacity-65">
                                {mode == Mode.SIGNIN ? 'Sign In' : 'Sign Up'}
                            </button>

                            <span className="text-sm text-gray-500">
                                <i className="inline">{mode == Mode.SIGNIN ? `Don't have an account? ` : `Already have an account? `}</i>
                                <button onClick={() => switchMode()}>
                                    <i className="text-secondary-teal hover:opacity-65">{mode == Mode.SIGNIN ? `Create one` : `Sign in`}</i>
                                </button>
                            </span>
                        </div>

                        <p className="text-center text-primary-gray">or</p>

                        <GoogleSignInButton text={mode == Mode.SIGNIN ? `Sign in with Google` : `Sign up with Google`} handleClick={handleGoogleAuth}  />
                    </div>

                    
                </div>

                {state == ViewState.LOADING ? 
                    <div className="absolute rounded-[40px] top-0 left-0 w-full h-full bg-white opacity-85 flex justify-center">
                        <LoadingSpinner bgColor="border-gray-300" spinColor="border-t-secondary-teal" />
                    </div>
                :
                    null
                }
            </div>
        </div>
    )   
    
       
}