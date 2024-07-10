import Image from "next/image"

const ReviewCard = () => {
    return (
        <div className="flex flex-col w-[300px] h-[200px] rounded-2xl border-2 p-4 gap-6">
            <div className="flex">
                <p className="text-sm font-Satoshi">"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia tempora recusandae aut similique totam eum rerum sapiente. Consectetur qui mollitia."</p>
            </div>
            <div className="flex flex-row gap-4">
                <Image 
                src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8fDA%3D" 
                alt="image" 
                width={50} 
                height={50} 
                className="rounded-full w-12 h-12 object-cover"
                />
                <p className="text-sm font-Satoshi font-semibold flex justify-center items-center">John Doe</p>
            </div>
                
        </div>
    )
}

export default ReviewCard