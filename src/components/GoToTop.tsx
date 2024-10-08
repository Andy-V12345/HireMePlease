import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GoToTopProps from "../props/GoToTopProps"

function GoToTop({ isVisible, handleScrollUp }: GoToTopProps) {

    if (isVisible) {
        return (
            <button onClick={() => handleScrollUp()} className="fixed right-6 top-6 text-sm text-white w-6 h-6 hover:opacity-75 bg-secondary-teal rounded-full">
                <FontAwesomeIcon className="text-xs" icon={faChevronUp} />
            </button>
        )
    }
    else {
        return null
    }
}

export default GoToTop