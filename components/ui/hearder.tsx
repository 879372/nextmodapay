import { IconNotification } from "@tabler/icons-react";
import { Bell, ChevronsLeftRightIcon, MessageCircle, Search, Settings, Settings2, User } from "lucide-react";
import Link from "next/link";

export default function Header(props:any) {
  return (
    <header className="bg-white flex justify-between h-20 items-center border-b-2 w-full">
      <h1 className="text-4xl font-bold text-pink-900 pl-6">{props.titulo}</h1>
      <nav className="mr-6">
        <ul className="flex items-center text-black gap-5">
          <li>
            <Link href="/">
              <Search className="text-zinc-500"/>
            </Link>
          </li>
          <li>
            <Link href="/">
              <Settings2  className="text-zinc-500"/>
            </Link></li>
          <li>
            <Link href="/">
              <MessageCircle className="text-zinc-500"/>
            </Link></li>
          <li>
            <Link href="/">
              <Bell  className="text-zinc-500"/>
            </Link></li>
          <li className="w-100 h-100 p-3 rounded-full bg-slate-100">
            <Link href="/">
              <User className="text-zinc-500"/>
            </Link></li>
        </ul>
      </nav>
    </header>
  );
}
