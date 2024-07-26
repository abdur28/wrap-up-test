import { getInformation, isAdmin } from "@/lib/data";
import Navbar from "./Navbar";
import AddReviewModal from "../AddReviewModel";

const NavWrapper = async () => {
    const info = await getInformation()
    const adminPresent = await isAdmin()

    return (
        <>
            <Navbar admin={adminPresent} />
        </>
    )    
}

export default NavWrapper;