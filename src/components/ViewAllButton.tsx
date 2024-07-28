'use client'

import { useRouter } from "next/navigation";



const ViewAllButton = ({location}: {location: string}) => {
    const router = useRouter();

    return (
        <div className="flex w-full justify-center">
        <button 
        onClick={() => router.push(`/${location}`)}
        className="rounded-2xl ring-1 ring-black text-black w-max py-1 px-3  hover:bg-primary hover:text-white hover:ring-transparent">
            View All
        </button>
</div>
    )
}

export default ViewAllButton