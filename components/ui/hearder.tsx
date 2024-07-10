import { IconBell, IconMessageCircle, IconNotification, IconSearch, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 


export default function Header(props: any) {
  const router = useRouter(); 
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login'); 
  };

  return (
    <header className="bg-white flex justify-between h-20 items-center border-b-2 w-full">
      <h1 className="text-4xl font-extrabold text-pink-900 pl-6">{props.titulo}</h1>
      <nav className="mr-6">
        <ul className="flex items-center text-black gap-3">
        <li className=" p-2 rounded-lg hover:bg-slate-100">
        <Link href="/">
              <IconSearch className="text-zinc-500 text-xs"/>
            </Link>
          </li>
          <li className=" p-2 rounded-lg hover:bg-slate-100">
          <Link href="/">
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
          <li>
            <button
              onClick={handleLogout}
              className="text-zinc-500 cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
