import { Posting } from "../firebase/FirestoreFunctions";

interface PostingRowProps {
    id: string,
    index: number,
    posting: Posting,
}

export default PostingRowProps