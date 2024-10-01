import LoadingSpinnerProps from "../props/LoadingSpinnerProps"

function LoadingSpinner({ spinColor, bgColor }: LoadingSpinnerProps) {
    return (
        <div className={`${bgColor} ${spinColor} h-[25px] w-[25px] animate-spin rounded-full border-[4px] my-auto`} />
    )
}

export default LoadingSpinner