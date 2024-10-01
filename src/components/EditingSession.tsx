import { useState } from "react";
import ChildrenProp from "../props/ChildrenProp";
import { Edit, EditingContext } from "./EditingContext";

function EditingSession({ children }: ChildrenProp) {

    const [edits, setEdits] = useState<{[key: string]: Edit}>({})
    const [needToSave, setNeedToSave] = useState(false)

    return (
        <EditingContext.Provider value={{edits, setEdits, needToSave, setNeedToSave}}>
            {children}
        </EditingContext.Provider>
    )
}

export default EditingSession