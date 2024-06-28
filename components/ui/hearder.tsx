
import { LucidePackage2, Search, SearchCheck, SearchCheckIcon } from "lucide-react"
import Link from "next/link"

export default function Header(){
    return(
        <header className="bg-white flex justify-between h-20 items-center border-b-2">
        <h1 className=" text-4xl font-bold text-pink-900 pl-6">Dashboard</h1>
            <nav >
                <ul className="flex text-black gap-3">
                   <Link href="/"><li><SearchCheckIcon style={{ color: '#000000', fill: '#DB2777' }}/></li></Link>
                    <li>config</li>
                    <li>conver</li>
                    <li>notf</li>
                    <li>user</li>
                </ul>
            </nav>
        </header>
    )
}