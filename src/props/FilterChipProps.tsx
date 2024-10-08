import ChipState from "../enums/ChipState"

interface FilterChipProps {
    bgColor: string,
    textColor: string,
    text: string,
    id: number,
    chipStates: ChipState[],
    setChipStates: React.Dispatch<React.SetStateAction<ChipState[]>>
}

export default FilterChipProps