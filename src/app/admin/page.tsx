import AdminPanel from "@/components/Admin/AdminPanel";
import { getInformation, isAdmin } from "@/lib/data";
import { notFound } from "next/navigation";


const Admin = async() => {
    const info = await getInformation()
    const adminPresent = await isAdmin()

    if (!adminPresent) {
        return <div>{notFound()}</div>
    }

    return (
        <>
        <div className="lg:hidden h-[70vh] w-full flex justify-center p-10 text-center items-center font-semibold">
            Sorry, the admin panel can only be accessed on large screens.
        </div>
        <div className="hidden lg:block">
            <AdminPanel info={JSON.stringify(info)}/>
        </div>
        </>
    )
};

export default Admin;