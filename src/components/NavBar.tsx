'use client'

import Link from "next/link"
import { GiCharacter } from "react-icons/gi"

export default function NavBar() {
  return (
    <nav className="flex flex-col space-y-4 bg-slate-900 text-white hover:text-gray-400">
      <Link className={"p-2 flex items-center"} href="/characters"><GiCharacter /><span>List Characters</span></Link>
    </nav>
  )
}
