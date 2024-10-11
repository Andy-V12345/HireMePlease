/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect } from "react"
import PostingsTableProps from "../props/PostingsTableProps"
import PostingRow from "./PostingRow"
import { EditingContext } from "./EditingContext"
import SaveButton from "./SaveButton"
import FilterChip from "./FilterChip"
import ChipState from "../enums/ChipState"
import ApplicationStatus from "../enums/ApplicationStatus"
import { ColumnFiltersState, createColumnHelper, FilterFn, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, Row, useReactTable } from "@tanstack/react-table"
import { Posting } from "../firebase/FirestoreFunctions"
import { Pagination } from "@nextui-org/pagination"

export interface OptionsContextType {
    optionIndex: number,
    setOptionIndex: React.Dispatch<React.SetStateAction<number>>
}

export const OptionsContext = createContext<OptionsContextType | null>(null)

function PostingsTable({ postings, setPostings }: PostingsTableProps) {

    const editingContext = useContext(EditingContext)
    const [optionIndex, setOptionIndex] = useState(-1)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [chipStates, setChipStates] = useState<ChipState[]>([ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED])
    const [filters, setFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 100,
    })

    const chipStatetoFilter: {[key: number]: ApplicationStatus} = {
        1: ApplicationStatus.PENDING,
        2: ApplicationStatus.OA,
        3: ApplicationStatus.INTERVIEWING,
        4: ApplicationStatus.ACCEPTED,
        5: ApplicationStatus.REJECTED,
    }

    const statusFilterFn: FilterFn<Posting> = (row: Row<Posting>, columnId: string, filterValue: ApplicationStatus[]) => {
        return filterValue.length == 0 || filterValue.includes(row.getValue(columnId))
    }

    useEffect(() => {
        if (Object.keys(editingContext!.edits).length > 0) {
            setShowSaveButton(true)
        }
        else {
            setShowSaveButton(false)
        }
    }, [editingContext!.edits])

    useEffect(() => {
        const newFilters: ApplicationStatus[] = []

        for (let i = 1; i < chipStates.length; i++) {
            if (chipStates[i] == ChipState.PRESSED) {
                newFilters.push(chipStatetoFilter[i])
            }
        }

        setFilters([{id: "appStatus", value: newFilters}] as ColumnFiltersState)
    }, [chipStates])

    const colHelper = createColumnHelper<Posting>()

    const columns = [
        colHelper.accessor('id', {
            id: 'id',
            header: () => "ID",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.appDate', {
            id: 'appDate',
            header: () => "Date Applied",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.appStatus', {
            id: 'appStatus',
            header: () => "Status",
            cell: (info) => info.getValue(),
            filterFn: statusFilterFn
        }),
        colHelper.accessor('data.company', {
            id: 'company',
            header: () => "Company",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.role', {
            id: 'role',
            header: () => "Role",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.locations', {
            id: 'locations',
            header: () => "Locations",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.url', {
            id: 'url',
            header: () => "Application Link",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.date_posted', {
            id: 'date_posted',
            header: () => "Date Posted",
            cell: (info) => info.getValue()
        }),
    ]

    const table = useReactTable({ 
        data: postings, 
        columns, 
        getCoreRowModel: getCoreRowModel(), 
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            columnFilters: filters,
            pagination: pagination
        },
        onColumnFiltersChange: setFilters
    })

    return (
            <OptionsContext.Provider value={{optionIndex, setOptionIndex}}>
                <div className="flex flex-col gap-5 pb-10">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl text-secondary-teal font-bold">Filters</h2>
                        <div className="flex gap-3">
                            <FilterChip id={0} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-secondary-teal"} textColor={"text-white"} text={"Applied"} />
                            <FilterChip id={1} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-yellow-200"} textColor={"text-yellow-700"} text={"Pending"} />
                            <FilterChip id={2} chipStates={chipStates} setChipStates={setChipStates}  bgColor={"bg-purple-200"} textColor={"text-purple-700"} text={"OA"} />
                            <FilterChip id={3} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-blue-200"} textColor={"text-blue-700"} text={"Interview"} />
                            <FilterChip id={4} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-green-200"} textColor={"text-green-700"} text={"Accepted"} />
                            <FilterChip id={5} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-red-200"} textColor={"text-red-700"} text={"Rejected"} />
                        </div>
                    </div>
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

                        <tbody>
                            {table.getRowModel().rows.map((row, i) => (
                                <PostingRow key={row.id} index={i} id={row.getValue("id")} posting={row.original} />
                            ))
                            }
                        </tbody>
                    </table>
                    

                    <Pagination loop={false} onChange={(page) => table.setPageIndex(page - 1)} classNames={{cursor: "bg-secondary-teal", item: "bg-secondary-gray text-primary-gray"}} isCompact={true} showControls={true} className={`mx-auto ${table.getPageCount() == 0 ? "hidden" : ""}`} total={table.getPageCount()} initialPage={1} />

                </div>
                
                <SaveButton isVisible={showSaveButton} postings={postings} setPostings={setPostings} />
                
            </OptionsContext.Provider>
    )
}

export default PostingsTable