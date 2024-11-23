import { useContext } from "react"
import DateAppliedProps from "../props/DateAppliedProps"
import { EditingContext } from "./EditingContext"

function DateApplied({ id, status, date, setDate, posting, postings, setPostings }: DateAppliedProps) {

    const editingContext = useContext(EditingContext)

    const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newDate = e.currentTarget.value
        setDate(newDate)

        const tmpEdits = Object.assign({}, editingContext!.edits)
        tmpEdits[id] = {
            isFavorite: posting.data.isFavorite,
            appStatus: status,
            appDate: newDate
        }

        posting.data.appDate = newDate

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

    if (date === "" || date === "--") {
        return (
            <p>--</p>
        )
    }
    else {
        return (
            <input value={date} onChange={handleDateChange} type="date" className="appearance-none outline-none hover:opacity-65" />
        )
    }
}

export default DateApplied