'use client'

import { createNewCharacter } from "@/lib/character"
import { useRouter } from "next/navigation"

type Props = {
  systemName: string
}

export default function CreateCharButton({ systemName }: Props) {

  const router = useRouter()

  async function clickHandler() {
    const characterId = await createNewCharacter(systemName)
    router.push(`/characters/${characterId}`)
  }

  return (
    <button className="bg-green-950 flex grow drop-shadow-lg shadow-2xl p-2 hover:text-gray-400 justify-center m-2" type="button" onClick={clickHandler}>New character</button>
  )
}
