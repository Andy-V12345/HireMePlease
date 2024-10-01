/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/AuthManager"
import { signOut } from "firebase/auth"
import { getAllPostings, Posting } from "../firebase/FirestoreFunctions"
import PostingsTable from "../components/PostingsTable"
import EditingSession from "../components/EditingSession"

function HomePage() {

    const authContext = useContext(AuthContext)

    const [postings, setPostings] = useState<Posting[]>([])

    const logout = () => {
        signOut(authContext!.auth)
    }

    const getPostings = async () => {
        const tmp = await getAllPostings(authContext!.user!.uid)
        setPostings(tmp)
    }

    useEffect(() => {
        getPostings()
    }, [])

    return(
        <EditingSession>
            <div className="bg-white w-full h-full absolute flex justify-center">
                <div className="bg-white w-11/12 max-w-[1300px] h-full py-10">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2 max-w-[1000px]">
                            <h1 className="text-3xl font-bold text-secondary-teal">Welcome to Hire Me Please,</h1>
                            <h2 className="text-lg font-semibold text-primary-gray">
                                {`A place to tackle the harsh, cold world of tech recruitment. Here, you can see job applications for different roles 
                                in tech (primarily SWE) and keep track of the (many) roles you'll apply for. Application data is pulled every 6 hours from `}
                                <a className="text-secondary-teal" href="https://github.com/Ouckah/Summer2025-Internships">{`Ouckah Github Repo`}</a>
                                {`.`}
                            </h2>
                        </div>
                        
                        
                        <PostingsTable postings={postings} />
                    </div>
                </div>
            </div>
        </EditingSession>
    )
}

export default HomePage