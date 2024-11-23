import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./FirebaseConfig"
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import ApplicationStatus from "../enums/ApplicationStatus"
import { Edit } from "../components/EditingContext"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export type Posting = {
    id: string,
    data: PostingData
}

export type PostingData = {
    isFavorite: boolean,
    company: string,
    role: string,
    locations: string,
    url: string,
    date_posted: string,
    appDate: string,
    appStatus: number
}

export async function getUserPostings(uid: string) {
    const docRef = doc(db, "userPostings", uid)
    const docSnap = await getDoc(docRef)
    let userPostings: {[key: string]: Edit} = {}

    if (docSnap.exists()) {
        userPostings = docSnap.data()
    }
    return userPostings
}

export async function saveUpdatedPostings(edits: {[key: string]: Edit}, uid: string, postings: Posting[], setPostings: React.Dispatch<React.SetStateAction<Posting[]>>) {
    const userPostings = await getUserPostings(uid)
    console.log(edits)

    for (const id in edits) {
        if (id in userPostings && edits[id].appStatus == ApplicationStatus.NOTAPPLIED) {
            delete userPostings[id]
            continue
        }

        userPostings[id] = edits[id]
    }

    setPostings(postings)
    await setDoc(doc(db, "userPostings", uid), userPostings)
}

export async function getAllPostings(uid: string) {
    
    const [querySnapshot, userPostings] = await Promise.all([getDocs(collection(db, "postings")), getUserPostings(uid)])

    const postings: Posting[] = []

    querySnapshot.forEach((doc) => {
        const docData = doc.data()
        const postingData: PostingData = {
            isFavorite: false,
            appStatus: ApplicationStatus.NOTAPPLIED,
            appDate: "",
            company: docData.company,
            role: docData.role,
            locations: docData.locations,
            url: docData.url,
            date_posted: docData.date_posted
        }

        // const locationIndex = postingData.locations.indexOf("locations")
        // if (locationIndex != -1) {
        //     const newLocations = postingData.locations.substring(0, locationIndex + "locations".length)
        //     postingData.locations = newLocations
        // }

        if (doc.id in userPostings) {
            postingData.isFavorite = userPostings[doc.id].isFavorite === undefined ? false : true
            postingData.appStatus = userPostings[doc.id].appStatus
            postingData.appDate = userPostings[doc.id].appDate
        }

        const newPosting = {
            id: doc.id,
            data: postingData
        }

        postings.push(newPosting)
    })

    postings.sort((a, b) => {
        const dateA = new Date(`${a.data.date_posted}`)
        const dateB = new Date(`${b.data.date_posted}`)

        const dateATime = dateA.getTime()
        const dateBTime = dateB.getTime()

        if (dateATime === dateBTime) {
            if (a.data.company < b.data.company) {
                return -1
            }
            else {
                return 1
            }
        }

        return dateBTime - dateATime
    })

    return postings
}