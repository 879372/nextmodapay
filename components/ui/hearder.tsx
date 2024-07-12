import { IconBell, IconMenu, IconMenu2, IconMenuDeep, IconMessageCircle, IconNotification, IconSearch, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

export default function Header(props: any) {
  const router = useRouter(); 
  const [menuOpen, setMenuOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  

  return (
    <header className="bg-white flex justify-between h-20 items-center border-b-2  px-6">
      <h1 className="text-4xl font-extrabold text-pink-900">{props.titulo}</h1>
      <nav className="relative">
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <IconMenuDeep className="text-zinc-500 text-2xl" />
        </button>
        <ul className={`flex items-center text-black gap-3 ${menuOpen ? 'block' : 'hidden'} md:flex absolute right-0 top-20 md:static p-3 bg-white md:bg-transparent md:shadow-none shadow-md md:rounded-none rounded-md`}>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="/">
              <IconSearch className="text-zinc-500 text-xs"/>
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="/profile">
              <IconSettings className="text-zinc-500 text-xs"/>
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="/">
              <IconMessageCircle className="text-zinc-500 text-xs"/>
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="/">
              <IconBell className="text-zinc-500 text-xs hover:bg-slate-100 rounded-sm "/>
            </Link>
          </li>
          <li className=" p-3 rounded-full bg-slate-100">
            <Link href="/">
              <IconUser className="text-zinc-500 text-xs "/>
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
}
