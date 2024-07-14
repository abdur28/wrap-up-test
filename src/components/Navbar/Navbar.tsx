import Image from "next/image"
import Link from "next/link"
import NavIcons from "./NavIcons"
import Menu from "./Menu"
import Sidebar from "./Sidebar"

const Navbar = () => {
    return (
        <div className="sticky top-0 z-30">
            <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative lg:hidden">
                {/* MOBILE */}
                <div className="h-full flex items-center justify-between ">
                    <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo.png" alt="" width={24} height={24} />
                    <div className="text-xl tracking-wide">Wrap Up</div>
                    </Link>
                    <Sidebar />
                </div>
            </div>

            <div className="h-24 sticky top-0 w-screen lg:flex justify-center items-center z-30 hidden ">
                <div className="flex gap-6 py-4 px-5 font-Satoshi font-normal text-sm bg-white/30 backdrop-blur-lg rounded-xl border">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="" width={18} height={18} />
                        
                    </Link>
                    <Link href={'/wrapup'} >Wrap Up</Link>
                    <Link href="/services"  >Sevices</Link>
                    {/* <Link href="/">Deals</Link> */}
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <NavIcons />
                </div>
            </div>
        </div>     
    )    
}

export default Navbar