'use client'

import {deleteCharacter} from "@/lib/character"
import { useRouter } from "next/navigation"

type Props = {
  characterId: string
}

export default function YesCancel({characterId}: Props) {

  const router = useRouter()

  async function submitHandler() {
    await deleteCharacter(characterId)
    router.push("/characters", {reload: true})
  }

  return (
    <>
      <div className="flex justify-between">
        <button className="flex m bg-red-500 p-2 mx-2 rounded" type="button" onClick={submitHandler}>Delete</button>
        <button className="flex bg-green-500 p-2 mx-2 rounded" type="button" onClick={() => history.back()}>Cancel</button>
      </div>
    </>
  )
}
