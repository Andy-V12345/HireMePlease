import ApplicationStatus from "../enums/ApplicationStatus";
import { Posting } from "../firebase/FirestoreFunctions";

interface StatusIndicatorProps {
    id: string,
    status: ApplicationStatus
    setStatus: React.Dispatch<React.SetStateAction<ApplicationStatus>>
    index: number,
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>,
    posting: Posting,
    postings: Posting[],
    setPostings: React.Dispatch<React.SetStateAction<Posting[]>>
}

export default StatusIndicatorProps