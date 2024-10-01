import { createContext } from "react"
import ApplicationStatus from "../enums/ApplicationStatus"

export interface EditingContextType {
    edits: {
        [key: string]: Edit
    },
    setEdits: React.Dispatch<React.SetStateAction<{[key: string]: Edit}>>,
    needToSave: boolean,
    setNeedToSave: React.Dispatch<React.SetStateAction<boolean>>
}

export type Edit = {
    appStatus: ApplicationStatus,
    appDate: string
}

export const EditingContext = createContext<EditingContextType | null>(null)