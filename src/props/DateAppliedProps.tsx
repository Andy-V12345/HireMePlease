import ApplicationStatus from "../enums/ApplicationStatus";
import { Posting } from "../firebase/FirestoreFunctions";

export default interface DateAppliedProps {
    id: string,
    status: ApplicationStatus,
    date: string
    setDate: React.Dispatch<React.SetStateAction<string>>,
    posting: Posting
}