import { Posting } from "../firebase/FirestoreFunctions";

interface SaveButtonProps {
    postings: Posting[]
    setPostings: React.Dispatch<React.SetStateAction<Posting[]>>
}

export default SaveButtonProps