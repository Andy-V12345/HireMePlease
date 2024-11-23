import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import StatusIndicatorProps from "../props/StatusIndicatorProps"
import ApplicationStatus from "../enums/ApplicationStatus"
import { useContext } from "react"
import { OptionsContext } from "./PostingsTable"
import { EditingContext } from "./EditingContext"

function StatusIndicator({ id, status, setStatus, index, date, setDate, posting, postings, setPostings }: StatusIndicatorProps) {

    const optionsContext = useContext(OptionsContext)
    const editingContext = useContext(EditingContext)

    const statusText = {
        0: "Not Applied",
        1: "Pending",
        2: "OA",
        3: "Interview",
        4: "Accepted",
        5: "Rejected"
    }

    const statusBgColor = {
        0: "bg-secondary-gray",
        1: "bg-yellow-200",
        2: "bg-purple-200",
        3: "bg-blue-300",
        4: "bg-green-300",
        5: "bg-red-300"
    }

    const statusTextColor = {
        0: "text-primary-gray",
        1: "text-yellow-700",
        2: "text-purple-700",
        3: "text-blue-700",
        4: "text-green-700",
        5: "text-red-700"
    }

    const options = [
        ApplicationStatus.NOTAPPLIED,
        ApplicationStatus.PENDING,
        ApplicationStatus.OA,
        ApplicationStatus.INTERVIEWING,
        ApplicationStatus.ACCEPTED,
        ApplicationStatus.REJECTED
    ]

    function formatDate(date: Date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    const handleClick = (option: ApplicationStatus) => {
        if (option != status) {
            setStatus(option)
            optionsContext!.setOptionIndex(-1)
            let newDate = ""

            if (option != ApplicationStatus.NOTAPPLIED) {
                if (date === "" || date === "--") {
                    newDate = formatDate(new Date())
                    setDate(newDate)
                }
                else {
                    newDate = date
                }
            }
            else {
                setDate("")
            }

            const tmpEdits = Object.assign({}, editingContext!.edits)
            tmpEdits[id] = {
                isFavorite: posting.data.isFavorite,
                appStatus: option,
                appDate: newDate
            }

            posting.data.appDate = newDate
            posting.data.appStatus = option

            const postingsCopy = [...postings]

            postingsCopy.map(posting => {
                if (posting.id == id) {
                    return { ...posting }
                }
                else {
                    return posting
                }
            })

            setPostings(postingsCopy)

            
            editingContext!.setEdits(tmpEdits)
        }
        else {
            optionsContext!.setOptionIndex(-1)
        }
    }

    return (
        <div>
            <div onClick={() => optionsContext!.setOptionIndex(index)} className={`flex flex-row items-center gap-2 w-fit ${statusBgColor[status]} ${statusTextColor[status]} px-3 py-1 rounded-xl hover:opacity-70`}>
                <FontAwesomeIcon icon={index === optionsContext!.optionIndex ? faChevronUp : faChevronDown} className="text-xs" />

                <p className={`text-nowrap text-sm font-semibold`}>{statusText[status]}</p>
            </div>

            {index === optionsContext!.optionIndex ? 
                <>
                    <div onClick={() => optionsContext!.setOptionIndex(-1)} className="fixed w-screen h-screen top-0 left-0">

                    </div>
                    <div className="absolute bg-white shadow-lg mt-2 px-3 rounded-md">
                        <ul>
                            {
                                options.map((option) => (
                                    <li key={option} className={`${statusTextColor[option]} text-sm font-semibold my-3 hover:opacity-70`}>
                                        <button onClick={() => handleClick(option)} className="w-full text-left">
                                            {statusText[option]}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </>
                
            :
                null
            }
        </div>
    )
}

export default StatusIndicator