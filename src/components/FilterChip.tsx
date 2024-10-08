/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import FilterChipProps from "../props/FilterChipProps"
import ChipState from "../enums/ChipState"

function FilterChip({bgColor, text, textColor, id, setChipStates, chipStates}: FilterChipProps) {

    const [state, setState] = useState<ChipState>(ChipState.UNPRESSED)

    const handleClick = () => {
        let tmp = [...chipStates]

        if (id == 0) {
            if (state == ChipState.UNPRESSED) {
                tmp = Array(6).fill(ChipState.PRESSED)
            }
            else {
                tmp = Array(6).fill(ChipState.UNPRESSED)
            }
        }
        else {
            if (tmp[id] == ChipState.PRESSED) {
                if (tmp[0] == ChipState.PRESSED) {
                    tmp[0] = ChipState.UNPRESSED
                }

                tmp[id] = ChipState.UNPRESSED
            }
            else {
                tmp[id] = ChipState.PRESSED
            }
        }

        setChipStates(tmp)
    }

    useEffect(() => {
        setState(chipStates[id])
    }, [chipStates])

    return (
        <button onClick={() => handleClick()} className={`${state === ChipState.UNPRESSED ? `bg-secondary-gray` : `${bgColor}`} rounded-md py-1 px-3 hover:opacity-75`}>
            <p className={` text-sm font-semibold ${state === ChipState.UNPRESSED ? `text-primary-gray` : `${textColor}`}`}>{text}</p>
        </button>
    )
}

export default FilterChip