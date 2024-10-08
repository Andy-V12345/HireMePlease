import { Posting } from "../firebase/FirestoreFunctions";

interface PostingsTableProps {
    postings: Posting[]
    setPostings: React.Dispatch<React.SetStateAction<Posting[]>>
}

export default PostingsTableProps