import { loadCharacter } from "@/lib/character";
import { loadSystem } from "@/lib/system";
import { getAllCharacters } from "@/lib/utils"
import { Suspense } from "react";
import { TTRPGSystems } from "@root/system_loader";

type Params = {
  params: {
    characterId: string
  }
}

export const revalidate = 10

/**
 * 
 * @param param0 
 * @returns 
 */
export default async function CharacterPage({params: {characterId}}: Params) {

  const character = await loadCharacter(characterId)

  const TTRPGSystem: TTRPGSystem = await loadSystem(character.systemId)

  // @ts-ignore
  const Character = TTRPGSystems[TTRPGSystem.name]
  return (
    <Suspense fallback={<div>Loading character...</div>}>
      <Character character={character} />
    </Suspense>
  )
}

/**
 * SSG
 * @todo Cache newly created characters!
 * @returns 
 */
export async function generateStaticParams() {
  const charactersData : Promise<Character[]> = getAllCharacters()

  return (await charactersData).map(character => ({
    characterId: character.id,
  }))

}
