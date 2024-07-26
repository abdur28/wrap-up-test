import Image from "next/image"

const ReviewCard = ({rating, name, comment, profilePicture, product}: {rating: number, name: string, comment: string, profilePicture: string, product: string} ) => {
    
    return (
        <div className="flex flex-col w-[300px] h-[200px] rounded-2xl border-2 border-gray-700 p-3 justify-between">
            <div className="flex flex-col">
                <p className="text-xs font-Satoshi text-gray-500">{product}</p>
                <div className="flex flex-col">
                    <p className="text-sm font-Satoshi">&quot;{comment}&quot;</p>
                    <div className="flex flex-row justify-end items-center ">
                        {[...Array(rating)].map((_, i) => (
                            <Image 
                            key={i}
                            src="/star.png" 
                            className="cursor-pointer hover:scale-125 transition-all"
                            alt="" 
                            width={20} 
                            height={20} />
                        ))}               
                        </div>
                </div>
            </div>
            <div className="flex flex-row gap-4 ">
                <Image 
                src={profilePicture}
                alt="image" 
                width={40} 
                height={40} 
                className="rounded-full w-10 h-10  object-cover"
                />
               
                <p className="text-sm font-Satoshi font-semibold flex justify-start items-center">{name}</p>
                
            </div>
                
        </div>
    )
}

export default ReviewCard