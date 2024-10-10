import { Posting } from "../firebase/FirestoreFunctions";

interface SaveButtonProps {
    postings: Posting[]
    setPostings: React.Dispatch<React.SetStateAction<Posting[]>>
    isVisible: boolean
}

export default SaveButtonProps