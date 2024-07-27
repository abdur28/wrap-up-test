import { isAdmin } from "@/lib/data";
import Navbar from "./Navbar";

const NavWrapper = async () => {
    const adminPresent = await isAdmin()

    return (
        <>
            <Navbar admin={adminPresent} />
        </>
    )    
}

export default NavWrapper;