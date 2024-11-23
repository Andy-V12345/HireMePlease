import { Posting } from "../firebase/FirestoreFunctions";

interface PostingRowProps {
    id: string,
    index: number,
    posting: Posting,
    postings: Posting[],
    setPostings: React.Dispatch<React.SetStateAction<Posting[]>>
}

export default PostingRowProps