import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white flex justify-between h-20 items-center border-b-2  ">
      <h1 className="text-4xl font-bold text-pink-900 pl-6">Dashboard</h1>
      <nav className="mr-6">
        <ul className="flex text-black gap-3">
          <li>
            <Link href="/">
              <Search style={{ color: '#000000' }}/>
            </Link>
          </li>
          <li>config</li>
          <li>conver</li>
          <li>notf</li>
          <li>user</li>
        </ul>
      </nav>
    </header>
  );
}
