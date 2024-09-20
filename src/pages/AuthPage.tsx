import { useState } from "react";
import AuthTextInput from "../components/AuthTextInput";
import GoogleSignInButton from "../components/GoogleSignInButton";

enum Mode {
    SIGNIN = 1,
    SIGNUP
}

export default function AuthPage() {

    const [mode, setMode] = useState<Mode>(Mode.SIGNIN)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleGoogleAuth = () => {
        // TODO: SIGN IN WITH GOOGLE
    }

    const switchMode = () => {
        if (mode == Mode.SIGNIN) {
            setMode(Mode.SIGNUP)
        }
        else {
            setMode(Mode.SIGNIN)
        }
    }

    return (
        <div className="bg-secondary-gray w-full h-full absolute flex justify-center">
            <div className={`relative my-auto h-5/6 ${mode == Mode.SIGNIN ? `max-h-[575px]` : `max-h-[675px]`} w-1/2 max-w-[500px]`}>
                <div className="bg-white rounded-[30px] my-auto h-full w-full p-[45px] flex flex-col justify-between gap-8 overflow-y-scroll">
                    <h1 className="text-3xl font-black text-primary-gray">Hire Me Please</h1>

                    <AuthTextInput label={"Email"} placeholder={"hiremeplease@gmail.com"} value={email} setValue={setEmail} isSecure={false} isError={false} errorMsg={""} />
                    <AuthTextInput label={"Password"} placeholder={"Enter your password"} value={password} setValue={setPassword} isSecure={true} isError={false} errorMsg={""} />
                    {mode == Mode.SIGNUP ? 
                        <AuthTextInput label={"Confirm password"} placeholder={"Confirm your password"} value={confirmPassword} setValue={setConfirmPassword} isSecure={true} isError={false} errorMsg={""} />
                    :
                        null
                    }


                    <div className="mt-3 flex flex-col gap-6 items-center w-full">
                        <div className="flex flex-col gap-2 items-center w-full">
                            <button className="bg-secondary-teal text-md w-full text-white font-bold h-[50px] rounded-xl">
                                {mode == Mode.SIGNIN ? 'Sign In' : 'Sign Up'}
                            </button>

                            <span className="text-sm text-gray-500">
                                <i className="inline">{mode == Mode.SIGNIN ? `Don't have an account? ` : `Already have an account? `}</i>
                                <button onClick={() => switchMode()}>
                                    <i className="text-secondary-teal">{mode == Mode.SIGNIN ? `Create one` : `Sign in`}</i>
                                </button>
                            </span>
                        </div>

                        <p className="text-center text-primary-gray">or</p>

                        <GoogleSignInButton text={mode == Mode.SIGNIN ? `Sign in with Google` : `Sign up with Google`} handleClick={handleGoogleAuth}  />
                    </div>

                    
                </div>
            </div>
        </div>
    )   
    
       
}