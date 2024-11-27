/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useState, useEffect, useRef } from "react"
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
import { Input } from "@nextui-org/input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons"

export interface OptionsContextType {
    optionIndex: number,
    setOptionIndex: React.Dispatch<React.SetStateAction<number>>,
    clickedId: string,
    setClickedId: React.Dispatch<React.SetStateAction<string>>,
}

export const OptionsContext = createContext<OptionsContextType | null>(null)

function PostingsTable({ postings, setPostings }: PostingsTableProps) {

    const editingContext = useContext(EditingContext)
    const [clickedId, setClickedId] = useState("")
    const [optionIndex, setOptionIndex] = useState(-1)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [chipStates, setChipStates] = useState<ChipState[]>([ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED, ChipState.UNPRESSED])
    const [filters, setFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50,
    })
    const [companySearch, setCompanySearch] = useState("")
    const [showFavs, setShowFavs] = useState<boolean>(false)

    const [scrollOffset, setScrollOffset] = useState(0)

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

    const favFilterFn: FilterFn<Posting> = (row: Row<Posting>, columnId: string, filterValue: boolean[]) => {
        return filterValue.includes(row.getValue(columnId))
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

        setFilters([{id: "appStatus", value: newFilters}, {id: "company", value: companySearch}, {id: "isFavorite", value: showFavs ? [true] : [true, false]}] as ColumnFiltersState)
        table.setPageIndex(0)
    }, [chipStates, companySearch, showFavs])

    const colHelper = createColumnHelper<Posting>()

    const columns = [
        colHelper.accessor('id', {
            id: 'id',
            header: () => "ID",
            cell: (info) => info.getValue()
        }),
        colHelper.accessor('data.isFavorite', {
            id: 'isFavorite',
            header: () => "",
            cell: (info) => info.getValue(),
            filterFn: favFilterFn
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
            cell: (info) => info.getValue(),
            filterFn: "includesString"
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
        autoResetPageIndex: false,
        onColumnFiltersChange: setFilters
    })

    const scrollRef = useRef<HTMLElement>(null)

    const handlePageChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const updateScrollOffset = () => {
        setScrollOffset(window.pageYOffset)
    }

    useEffect(() => {
        if (scrollOffset > 0) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [pagination.pageIndex])

    useEffect(() => {
        window.addEventListener('scroll', updateScrollOffset)

        return () => {
            window.removeEventListener('scroll', updateScrollOffset)
        }
    }, [])

    return (
            <OptionsContext.Provider value={{optionIndex, setOptionIndex, clickedId, setClickedId}}>
                <div className="flex flex-col gap-5 pb-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-xl text-secondary-teal font-bold">Filters</h2>
                            <div className="flex gap-3">
                                <button onClick={() => setShowFavs(!showFavs)} className={`${!showFavs ? `bg-secondary-gray` : `bg-yellow-300`} rounded-md py-1 px-3 hover:opacity-75`}>
                                    <p className={` text-sm font-semibold ${!showFavs ? `text-primary-gray` : `text-yellow-600`}`}>Favorites</p>
                                </button>
                                <FilterChip id={0} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-secondary-teal"} textColor={"text-white"} text={"Applied"} />
                                <FilterChip id={1} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-yellow-200"} textColor={"text-yellow-700"} text={"Pending"} />
                                <FilterChip id={2} chipStates={chipStates} setChipStates={setChipStates}  bgColor={"bg-purple-200"} textColor={"text-purple-700"} text={"OA"} />
                                <FilterChip id={3} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-blue-200"} textColor={"text-blue-700"} text={"Interview"} />
                                <FilterChip id={4} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-green-200"} textColor={"text-green-700"} text={"Accepted"} />
                                <FilterChip id={5} chipStates={chipStates} setChipStates={setChipStates} bgColor={"bg-red-200"} textColor={"text-red-700"} text={"Rejected"} />
                            </div>
                        </div>

                        <Input 
                            endContent={
                                <button disabled={companySearch.trim() == ""} onClick={() => setCompanySearch("")}>
                                    <FontAwesomeIcon className={`${companySearch.trim() == "" ? `opacity-30` : `opacity-100`} text-base text-primary-gray ml-1 hover:opacity-50`} icon={faXmarkCircle} />
                                </button>
                            } 
                            value={companySearch} 
                            onValueChange={setCompanySearch} 
                            startContent={<FontAwesomeIcon className="text-xs text-primary-gray mr-1" icon={faSearch} />} 
                            classNames={{input: ["bg-secondary-gray text-primary-gray"]}} 
                            placeholder="Search for a company"/>
                    </div>


                    <table className="text-primary-gray">
                        
                        <tr className="text-left border-b-2 border-b-secondary-teal">
                            <th></th>
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
                                <PostingRow key={row.id} index={i} id={row.getValue("id")} posting={row.original} postings={postings} setPostings={setPostings} />
                            ))}
                        </tbody>
                    </table>
                    
                    <Pagination ref={scrollRef} loop={false} onChange={(page) => handlePageChange(page)} classNames={{cursor: "bg-secondary-teal", item: "bg-secondary-gray text-primary-gray"}} isCompact={true} showControls={true} className={`mx-auto ${table.getPageCount() == 0 ? "hidden" : ""}`} page={pagination.pageIndex + 1} total={table.getPageCount()} initialPage={1} />
                </div>
                
                <SaveButton isVisible={showSaveButton} postings={postings} setPostings={setPostings} />
                
            </OptionsContext.Provider>
    )
}

export default PostingsTable