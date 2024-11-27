import GoogleIcon from "../assets/google-icon.png"
import GoogleSignInButtonProps from "../props/GoogleSignInButtonProps"

function GoogleSignInButton({text, handleClick}: GoogleSignInButtonProps) {
    return (
        <button onClick={() => handleClick()} className="flex flex-row justify-center items-center h-[50px] relative bg-[#F2F2F2] w-full rounded-xl overflow-visible hover:opacity-65">
            <img className="w-10" alt="google-icon" src={GoogleIcon} />
            <p className="[font-family:'Inter-Bold',Helvetica] font-semibold text-primary-gray text-md tracking-[-0.68px] leading-[normal]">{text}</p>
        </button>
    )
}

export default GoogleSignInButton