import { getFieldByNameFromList, loadCharacter } from "@/lib/character"
import { getAllCharacters } from "@/lib/utils"
import YesCancel from "./components/YesCancel"

type Params = {
  params: {
    characterId: string
  }
}


export default async function CharacterDeletePage({ params: { characterId }}: Params) {
  const character = await loadCharacter(characterId)
  const characterName = getFieldByNameFromList(character.fields, "name")
  return (
    <>
      <div className="text-xl">Are you sure you want to delete character &quot;{characterName.value}&quot;?</div>
      <div className="text-sm italic">this action cannot be undone</div>
      <br />
      <YesCancel characterId={characterId} />
    </>
    
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
