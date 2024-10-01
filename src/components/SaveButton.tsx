import { useContext, useState } from "react"
import ViewState from "../enums/ViewState"
import LoadingSpinner from "./LoadingSpinner"
import { EditingContext } from "./EditingContext"
import { saveUpdatedPostings } from "../firebase/FirestoreFunctions"
import { AuthContext } from "./AuthManager"


function SaveButton() {

    const editingContext = useContext(EditingContext)
    const authContext = useContext(AuthContext)
    const [state, setState] = useState<ViewState>(ViewState.READY)

    const handleClick = async () => {
        setState(ViewState.LOADING)

        await saveUpdatedPostings(editingContext!.edits, authContext!.user!.uid)

        setState(ViewState.DONE)

        setTimeout(() => {
            editingContext!.setEdits({})
        }, 1000)
    }

    return (
        <button onClick={() => handleClick()} disabled={state !== ViewState.READY} className="fixed flex justify-center items-center bottom-6 right-6 w-[140px] h-[50px] bg-secondary-teal rounded-xl">
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
        </button>
    )
}

export default SaveButton