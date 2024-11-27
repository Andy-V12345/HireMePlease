import { ChangeEvent, useState } from "react"
import AuthTextInputProps from "../props/AuthTextInputProps"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons"

function AuthTextInput({label, placeholder, value, setValue, isSecure, isError, errorMsg}: AuthTextInputProps) {
    function handleTextChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        setValue(target.value)
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex flex-col">
            <p className="text-primary-teal text-md">{label}</p>

            <div className="flex border-b-[3px] border-secondary-teal gap-2">
                <input
                    className={`outline-none appearance-none w-full rounded-none py-2 bg-white text-primary-gray`} 
                    onChange={handleTextChange} 
                    placeholder={placeholder} 
                    value={value}
                    type={isSecure && showPassword == false ? `password` : `text`} />
                
                {isSecure ? 
                    <button className="hover:opacity-65" onClick={() => setShowPassword(!showPassword)}>
                        <FontAwesomeIcon className="my-auto" icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                :   
                    null
                }
            </div>

            {isError ? 
                <p className="text-sm text-red-400 mt-2 font-semibold">{errorMsg}</p>
            :
                null
            }

        </div>
    )
}

export default AuthTextInput