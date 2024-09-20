interface AuthTextInputProps {
    label: string,
    placeholder: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    isSecure: boolean,
    isError: boolean,
    errorMsg: string,
}

export default AuthTextInputProps