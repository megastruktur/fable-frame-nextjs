import Link from "next/link"
import { loadAllCharactersWithSystemAndName } from "@/lib/character"
import { GiCharacter } from "react-icons/gi";

import { listLoadedSystems } from "@/lib/system"
import CreateCharButton from "@/components/CreateCharButton";

// export const revalidate = 86400

// Do not cahce the fetch requests including PB
export const fetchCache = "default-no-store"

export async function generateMetadata() {
  return {
    title: "All characters",
    description: "The list of all characters",
  }
}

export default async function CharactersPage() {


  const [chars, enabledSystems] = await Promise.all([loadAllCharactersWithSystemAndName(), listLoadedSystems()])
  
  // Sort by system.
  let charsBySystem: any = {}

  // Create a list of all used RPG systems. Assign characters later.
  enabledSystems.map(system => {
    charsBySystem[system.systemName] = []
  })

  chars.map(char => {
    charsBySystem[char.systemName] = [...charsBySystem[char.systemName], char]
  })

  const contentBySystem = (
    <>
      {Object.keys(charsBySystem).map(systemName => {
        return (
          <div key={systemName} className="shadow-xl">
            <p className="text-2xl">{systemName}</p>
            <div className="flex grow flex-wrap items-center border border-gray-400 p-3">
              {charsBySystem[systemName].map((char: LoadedCharacter) => (
                <Link key={char.characterId}
                  className="bg-slate-600 flex grow drop-shadow-lg shadow-2xl p-2 hover:text-gray-400 justify-center m-2 rounded-lg font-bold"
                  href={`/characters/${char.characterId}`}>
                    {char.characterName}
                </Link>
              ))}
              <CreateCharButton systemName={systemName} />
            </div>
          </div>
        )
      })}
    </>
  )

  return (
    <>
      <h1 className="text-2xl">Welcome, Traveller! All your characters are here.</h1>

      <div className="flex items-center justify-center w-full">
        <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-slate-800">
            <GiCharacter />
        </div>
      </div>
      <div className="w-full">
        {contentBySystem}
      </div>
    </>
  )
}
