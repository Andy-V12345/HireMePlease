import ApplicationStatus from "../enums/ApplicationStatus";

interface StatusIndicatorProps {
    id: string,
    status: ApplicationStatus
    setStatus: React.Dispatch<React.SetStateAction<ApplicationStatus>>
    index: number,
    date: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
}

export default StatusIndicatorProps