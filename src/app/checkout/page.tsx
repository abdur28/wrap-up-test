import CheckOut from "@/components/CheckOutPage"
import { getUser } from "@/lib/data";

const CheckOutPage = async () => {
    const user = await getUser();
    return (
        <div>
            <CheckOut email={user?.email}/>
        </div>
    )
}

export default CheckOutPage