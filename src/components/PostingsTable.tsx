import { createContext, useContext, useState, useEffect } from "react"
import PostingsTableProps from "../props/PostingsTableProps"
import PostingRow from "./PostingRow"
import { EditingContext } from "./EditingContext"
import SaveButton from "./SaveButton"

export interface OptionsContextType {
    optionIndex: number,
    setOptionIndex: React.Dispatch<React.SetStateAction<number>>
}

export const OptionsContext = createContext<OptionsContextType | null>(null)

function PostingsTable({ postings }: PostingsTableProps) {

    const editingContext = useContext(EditingContext)
    const [optionIndex, setOptionIndex] = useState(-1)
    const [showSaveButton, setShowSaveButton] = useState(false)

    useEffect(() => {
        if (Object.keys(editingContext!.edits).length > 0) {
            setShowSaveButton(true)
        }
        else {
            setShowSaveButton(false)
        }
    }, [editingContext!.edits])

    return (
        <OptionsContext.Provider value={{optionIndex, setOptionIndex}}>  
            <table className="text-primary-gray">
                  
                <tr className="text-left border-b-2 border-b-secondary-teal">
                    <th className="text-nowrap pr-10">Date Applied</th>
                    <th className="pr-10">Status</th>
                    <th className="py-2">Company</th>
                    <th>Role</th>
                    <th>Locations</th>
                    <th className="text-nowrap pr-10">Application / Link</th>
                    <th className="text-nowrap pr-10">Date Posted</th>
                </tr>


                {
                    postings.map((posting, i) => (
                        <PostingRow key={posting.id} index={i} id={posting.id} posting={posting} />
                    ))
                }
            </table>
            
            {showSaveButton ?
                <SaveButton />
            :
                null
            }
        </OptionsContext.Provider>
    )
}

export default PostingsTable