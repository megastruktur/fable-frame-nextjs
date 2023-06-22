'use client'

import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export default function NavBar() {

  const menuItemsClasses: string = "hover:text-white text-white/90 no-underline"

  return (
    <nav className="px-6 py-2 bg-slate-900 drop-shadow-xl z-10 border-b-2">
      <div className="prose dark:prose-invert prose-xl mx-auto flex justify-between flex-col sm:flex-row align-middle text-3xl">
        <Link className={menuItemsClasses} href="/">Home</Link>
        <Link className={menuItemsClasses} href="/characters">Demo</Link>
        <Link className={menuItemsClasses} href="/posts/news">News</Link>
        <Link className={menuItemsClasses} href="/posts/blog">Dev blog</Link>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-3xl lg:text-4xl">
          <Link className={menuItemsClasses} href="https://github.com/megastruktur/fable-frame"><FaGithub /></Link>
        </div>
      </div>
    </nav>
  )
}
