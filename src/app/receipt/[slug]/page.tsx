import { getReceiptById } from "@/lib/data"
import { notFound } from "next/navigation"

const CheckPage = async ({ params }: { params: { slug: string }}) => {
    const id = params.slug
    const receipt = await getReceiptById(id)
    if (!receipt) {
        return <div>{notFound()}</div>
    }

    return (
        <div className="h-90vh] flex items-center justify-center">
            <div className="w-[400px] h-max flex flex-col bg-gray-100 p-4 gap-3">
                <div className="w-full  flex flex-row justify-between">
                    <div className="flex flex-col justify-between">
                        <h3 className="text-[0.8rem]">Ammount:</h3>
                        <h2 className="font-semibold text-2xl">₦ {receipt.amount/100}</h2>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className=" text-[0.8rem] text-white px-1 py-0.5 rounded-2xl bg-green-500 w-max mt-2"
                        >
                        <span>Success</span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-gray-300 h-[1px]"/>
                <div className="flex flex-col gap-2">
                    <h3 className="text-[0.8rem] font-semibold">Items</h3>
                    {receipt.cart.map((item: any) => (
                        <div className="w-full  flex flex-row justify-between"
                        key={item.itemId}
                        >
                            <div className="flex flex-col justify-between">
                                <h3 className="text-sm ">{item.productName}</h3>
                                <p className="text-gray-500 text-[0.7rem]">Color: {item.color} Size: {item.size}</p>
                            </div>
                            <div className="text-sm">
                                <div>{item.quantity} x ₦ {item.price}</div>
                            </div>
                        </div> 
                    ))}
                    <div className="flex flex-row justify-between">
                        <h3 className="text-sm font-semibold">Total</h3>
                        <h3 className="text-sm font-semibold">₦ {receipt.amount/100}</h3>
                    </div>
                </div>
                <div className="w-full bg-gray-300 h-[1px]"/>
                <div className="w-full flex flex-col ">
                    <p className="mb-2">Customer:</p>
                    <div className="flex flex-row justify-between text-xs">
                        <p>Name:</p>
                        <p className="font-semibold">{receipt.customer.name}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                        <p>Phone Number:</p>
                        <p className="font-semibold">{receipt.customer.phone}</p>
                    </div>
                    <div className="flex flex-row justify-between text-xs">
                        <p>Email:</p>
                        <p className="font-semibold">{receipt.customer.email}</p>
                    </div>
                    <div></div>
                </div>
                <div className="w-full bg-gray-300 h-[1px]"/>
                <div className="w-full flex flex-row justify-between">
                    <p>Reference:</p>
                    <p className="font-semibold">{receipt.reference}</p>
                </div>
                <div className="w-full bg-gray-300 h-[1px]"/>
                <div className="w-full flex flex-row justify-between">
                    <p>Channel:</p>
                    <p className="font-semibold">{receipt.channel}</p>
                </div>
                <div className="w-full bg-gray-300 h-[1px]"/>
                <div className="w-full flex flex-row justify-between items-center">
                    <p>Paid At:</p>
                    <p className="text-sm">{new Date(receipt.paidAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default CheckPage