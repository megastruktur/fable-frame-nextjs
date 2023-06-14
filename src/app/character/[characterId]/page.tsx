import { loadCharacter } from "@/lib/character";
import { getAllCharacters } from "@/lib/utils"
import dynamic from 'next/dynamic';

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
  const Character = dynamic(() => import('@/../data/systems/broken-compass/components/character'))

  const character = await loadCharacter(characterId)

  return (
    <Character character={character} />
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
