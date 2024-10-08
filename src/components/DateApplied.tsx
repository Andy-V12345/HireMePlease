import { useContext } from "react"
import DateAppliedProps from "../props/DateAppliedProps"
import { EditingContext } from "./EditingContext"

function DateApplied({ id, status, date, setDate, posting }: DateAppliedProps) {

    const editingContext = useContext(EditingContext)

    const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newDate = e.currentTarget.value
        setDate(newDate)

        const tmpEdits = Object.assign({}, editingContext!.edits)
        tmpEdits[id] = {
            appStatus: status,
            appDate: newDate
        }

        posting.data.appDate = newDate

        editingContext!.setEdits(tmpEdits)
    }

    if (date === "" || date === "--") {
        return (
            <p>--</p>
        )
    }
    else {
        return (
            <input value={date} onChange={handleDateChange} type="date" className="appearance-none outline-none" />
        )
    }
}

export default DateApplied