'use client'

import { createNewCharacter } from "@/lib/character"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
  systemName: string
}

export default function CreateCharButton({ systemName }: Props) {

  const router = useRouter()

  async function clickHandler(e: { preventDefault: () => void }) {
    e.preventDefault()
    const characterId = await createNewCharacter(systemName)
    router.push(`/characters/${characterId}`)
  }

  return (
    <Link className="bg-green-700 flex min-h-2 min-w-2 drop-shadow-lg shadow-2xl p-2 hover:text-gray-400 justify-center m-2 rounded-lg font-bold" onClick={clickHandler} href="/">New character</Link>
  )
}
