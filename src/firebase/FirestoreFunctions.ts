import { initializeApp } from "firebase/app"
import { firebaseConfig } from "./FirebaseConfig"
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore"
import ApplicationStatus from "../enums/ApplicationStatus"
import { Edit } from "../components/EditingContext"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export interface Posting {
    id: string,
    data: DocumentData
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

export async function saveUpdatedPostings(edits: {[key: string]: Edit}, uid: string) {
    const userPostings = await getUserPostings(uid)

    for (const id in edits) {
        if (id in userPostings && edits[id].appStatus == ApplicationStatus.NOTAPPLIED) {
            delete userPostings[id]
            continue
        }

        userPostings[id] = edits[id]
    }

    await setDoc(doc(db, "userPostings", uid), userPostings)
}

export async function getAllPostings(uid: string) {
    const querySnapshot = await getDocs(collection(db, "postings"))
    const userPostings = await getUserPostings(uid)
    const postings: Posting[] = []

    querySnapshot.forEach((doc) => {
        const postingData = {
            ...doc.data(),
            appStatus: ApplicationStatus.NOTAPPLIED,
            appDate: ""
        }

        if (doc.id in userPostings) {
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