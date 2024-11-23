/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../components/AuthManager"
import { signOut } from "firebase/auth"
import { getAllPostings, Posting } from "../firebase/FirestoreFunctions"
import PostingsTable from "../components/PostingsTable"
import EditingSession from "../components/EditingSession"
import ViewState from "../enums/ViewState"
import LoadingSpinner from "../components/LoadingSpinner"
import GoToTop from "../components/GoToTop"

function HomePage() {

    const authContext = useContext(AuthContext)

    const [postings, setPostings] = useState<Posting[]>([])
    const [state, setState] = useState<ViewState>(ViewState.LOADING)
    const [goToTopVisible, setGoToTopVisible] = useState(false)

    const logout = () => {
        signOut(authContext!.auth)
    }

    const getPostings = async () => {
        setState(ViewState.LOADING)
        const tmp = await getAllPostings(authContext!.user!.uid)
        setPostings(tmp)
        setState(ViewState.READY)
    }

    const handleVisibleButton = () => {
        const position = window.pageYOffset

        if (position > 50) {
            return setGoToTopVisible(true)
        }
        else if (position < 50) {
            return setGoToTopVisible(false)
        }
    }

    const handleScrollUp = () => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        getPostings()
        window.addEventListener('scroll', handleVisibleButton)

        return () => {
            window.removeEventListener('scroll', handleVisibleButton)
        }
    }, [])

    const scrollRef = useRef<HTMLDivElement>(null)

    return(
        <EditingSession>
            <div ref={scrollRef} className="bg-white w-full h-full absolute flex justify-center">
                <div className="bg-white w-11/12 max-w-[1300px] h-full py-10">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex w-full justify-between">
                                <h1 className="text-3xl font-bold text-secondary-teal">Welcome to Hire Me Please,</h1>

                                <button onClick={() => logout()} className="hover:opacity-55 py-2 px-4 text-base font-semibold h-fit text-primary-gray bg-secondary-gray rounded-md text-nowrap">
                                    Sign Out
                                </button>
                            </div>
                            <h2 className="text-lg font-semibold text-primary-gray">
                                {`A place to tackle the harsh, cold world of tech recruitment. Here, you can see job applications for different roles 
                                in tech (primarily SWE) and keep track of the (many) roles you'll apply for. Application data is pulled every 4 hours from `}
                                <a className="text-secondary-teal" href="https://github.com/Ouckah/Summer2025-Internships">{`Ouckah Github Repo`}</a>
                                {`.`}
                            </h2>
                        </div>
                        
                        {state === ViewState.READY ?
                            <PostingsTable postings={postings} setPostings={setPostings} />
                        :
                            <div className="rounded-[40px] mt-10 flex justify-center">
                                <LoadingSpinner bgColor="border-gray-300" spinColor="border-t-secondary-teal" />
                            </div>
                        }
                        
                    </div>
                </div>

                <GoToTop isVisible={goToTopVisible} handleScrollUp={handleScrollUp} />
            </div>
        </EditingSession>
    )
}

export default HomePage