import { IconBell, IconMenuDeep, IconMessageCircle, IconSearch, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from 'react';

interface HeaderProps {
  titulo: string;
  isOpen: boolean; // Add this line
  toggleSidebar: () => void; // Add this line
}

export default function Header({ titulo, isOpen, toggleSidebar }: HeaderProps) { // Modify this line
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  
  return (
    <>
    <header className={`flex-1 transition-margin duration-300 ease-in-out bg-white flex justify-between h-20 items-center border-b-2 fixed px-6 z-40 `}         style={{
          width: isOpen ? (isSmallScreen ? '100%' : 'calc(100% - 256px)') : '100%' }}>
      <h1 className="text-4xl font-extrabold text-pink-900">{titulo}</h1>
      <nav className="relative">
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <IconMenuDeep className="text-zinc-500 text-2xl" />
        </button>
        <ul className={`flex items-center text-black gap-3 ${menuOpen ? 'block' : 'hidden'} md:flex absolute right-0 top-20 md:static p-3 bg-white md:bg-transparent md:shadow-none shadow-md md:rounded-none rounded-md`}>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="">
              <IconSearch className="text-zinc-500 text-xs" />
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="/profile">
              <IconSettings className="text-zinc-500 text-xs" />
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="">
              <IconMessageCircle className="text-zinc-500 text-xs" />
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
            <Link href="">
              <IconBell className="text-zinc-500 text-xs hover:bg-slate-100 rounded-sm " />
            </Link>
          </li>
          <li className=" p-3 rounded-full bg-slate-100">
            <Link href="">
              <IconUser className="text-zinc-500 text-xs " />
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  </>
  );
}
