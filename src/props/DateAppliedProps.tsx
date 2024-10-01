import ApplicationStatus from "../enums/ApplicationStatus";

export default interface DateAppliedProps {
    id: string,
    status: ApplicationStatus,
    date: string
    setDate: React.Dispatch<React.SetStateAction<string>>
}