import { useContext, useState } from "react"
import PostingRowProps from "../props/PostingRowProps"
import StatusIndicator from "./StatusIndicator"
import ApplicationStatus from "../enums/ApplicationStatus"
import DateApplied from "./DateApplied"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons"
import { EditingContext } from "./EditingContext"
import { OptionsContext } from "./PostingsTable"

function PostingRow({ id, posting, index, postings, setPostings }: PostingRowProps) {

    const optionsContext = useContext(OptionsContext)
    const editingContext = useContext(EditingContext)
    const [status, setStatus] = useState<ApplicationStatus>(posting.data.appStatus)
    const [date, setDate] = useState(posting.data.appDate)
    const [isFavorite, setIsFavorite] = useState(posting.data.isFavorite)

    const handleFavoriteToggle = () => {
        const tmpEdits = Object.assign({}, editingContext!.edits)

        tmpEdits[id] = {
            appDate: posting.data.appDate,
            isFavorite: !isFavorite,
            appStatus: posting.data.appStatus
        }

        editingContext!.setEdits(tmpEdits)

        posting.data.isFavorite = !isFavorite
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
        setIsFavorite(!isFavorite)
    }

    const handleLinkClick = () => {
        optionsContext!.setClickedId(id)
    }

    return (
        <tr>
            <td className="pr-10">
                <button onClick={handleFavoriteToggle}>
                    <FontAwesomeIcon className={`text-yellow-300 text-xl hover:opacity-50`} icon={isFavorite ? faStarSolid : faStar} />
                </button>
            </td>
            <td className="pr-10">
                <DateApplied id={id} status={status} date={date} setDate={setDate} posting={posting} postings={postings} setPostings={setPostings} />
            </td>
            <td className="pr-10">
                <StatusIndicator id={id} date={date} setDate={setDate} index={index} status={status} setStatus={setStatus} posting={posting} postings={postings} setPostings={setPostings} />
            </td>
            <td className="font-semibold py-7 pr-10">{posting.data.company}</td>
            <td className="pr-10 py-3">{posting.data.role}</td>
            <td className="text-wrap pr-10 py-3 whitespace-pre-wrap">{posting.data.locations}</td>
            <td className="pr-10">
                {posting.data.url === "" ? 
                    <p className="py-2 text-sm font-bold w-full text-center bg-secondary-gray rounded-md opacity-45">Closed</p>

                :
                    <button onClick={handleLinkClick} className={`${id === optionsContext!.clickedId ? `border-2 border-secondary-teal` : ``} py-2 text-sm font-bold w-full text-center bg-secondary-gray rounded-md hover:opacity-65`}>
                        <a target="_blank" href={posting.data.url}>
                            <p className={`${id === optionsContext!.clickedId ? `text-secondary-teal` : ``}`}>{id === optionsContext!.clickedId ? "Just Clicked" : "Apply"}</p>
                        </a>
                    </button>
                }
            </td>
            <td>{posting.data.date_posted}</td>
        </tr>
    )

}

export default PostingRow