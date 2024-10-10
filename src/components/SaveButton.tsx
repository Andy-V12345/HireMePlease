import { useContext, useEffect, useState } from "react"
import ViewState from "../enums/ViewState"
import LoadingSpinner from "./LoadingSpinner"
import { EditingContext } from "./EditingContext"
import { saveUpdatedPostings } from "../firebase/FirestoreFunctions"
import { AuthContext } from "./AuthManager"
import SaveButtonProps from "../props/SaveButtonProps"
import { AnimatePresence, motion } from "framer-motion"


function SaveButton({ postings, setPostings, isVisible }: SaveButtonProps) {

    const editingContext = useContext(EditingContext)
    const authContext = useContext(AuthContext)
    const [state, setState] = useState<ViewState>(ViewState.READY)

    const handleClick = async () => {
        setState(ViewState.LOADING)

        await saveUpdatedPostings(editingContext!.edits, authContext!.user!.uid, postings, setPostings)

        setState(ViewState.DONE)

        setTimeout(() => {
            editingContext!.setEdits({})
        }, 1000)
    }

    useEffect(() => {
        if (isVisible) {
            setState(ViewState.READY)
        }
    }, [isVisible])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button onClick={() => handleClick()} disabled={state !== ViewState.READY} initial={{bottom: -30}} exit={{bottom: -50}} transition={{type: 'spring', duration: 0.75, bounce: 0.5}} animate={{bottom: 24}} className="fixed flex justify-center items-center right-6 w-[140px] h-[50px] bg-secondary-teal rounded-xl">
                    {state === ViewState.READY ?
                        <p className="text-base font-bold text-white">Save Changes</p>
                    :
                        <>
                            {state === ViewState.LOADING ?
                                <LoadingSpinner bgColor="border-secondary-teal" spinColor="border-t-white" />
                            :
                                <p className="text-base font-bold text-white">Done!</p>
                            }
                        </>
                    }
                </motion.button>
            )}
        </AnimatePresence>
        
    )
}

export default SaveButton