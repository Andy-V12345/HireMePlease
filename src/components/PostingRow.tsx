import { useState } from "react"
import PostingRowProps from "../props/PostingRowProps"
import StatusIndicator from "./StatusIndicator"
import ApplicationStatus from "../enums/ApplicationStatus"
import DateApplied from "./DateApplied"

function PostingRow({ id, posting, index }: PostingRowProps) {

    const [status, setStatus] = useState<ApplicationStatus>(posting.data.appStatus)
    const [date, setDate] = useState(posting.data.appDate)

    return (
        <tr className="">
            <td className="pr-10">
                <DateApplied id={id} status={status} date={date} setDate={setDate} posting={posting} />
            </td>
            <td className="pr-10">
                <StatusIndicator id={id} date={date} setDate={setDate} index={index} status={status} setStatus={setStatus} posting={posting} />
            </td>
            <td className="font-semibold py-7 pr-10">{posting.data.company}</td>
            <td className="pr-10 py-3">{posting.data.role}</td>
            <td className="text-wrap pr-10 py-3 whitespace-pre-wrap">{posting.data.locations}</td>
            <td className="pr-10">
                {posting.data.url === "" ? 
                    <p className="py-2 text-sm font-bold w-full text-center bg-secondary-gray rounded-md opacity-45">Closed</p>

                :
                    <a target="_blank" href={posting.data.url} className="hover:opacity-65">
                        <p className="py-2 text-sm font-bold w-full text-center bg-secondary-gray rounded-md">Apply</p>
                    </a>
                }
            </td>
            <td>{posting.data.date_posted}</td>
        </tr>
    )

}

export default PostingRow