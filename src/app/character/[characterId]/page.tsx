import ClickInput from "../components/ClickInput"
import { getAllCharacters, getEmptyCharacterField, loadCharacterFieldsByType, getFieldByNameFromList } from "@/lib/utils"
import RadioIncrementalSelect from "../components/RadioIncrementalSelect"
import { ListResult } from "pocketbase"

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

  const textFieldsData: Promise<ListResult<CharacterField>> = loadCharacterFieldsByType(characterId, "text")

  const skillsData : Promise<ListResult<CharacterField>> = loadCharacterFieldsByType(characterId, 'skill')


  const [skills, textFields] = await Promise.all([skillsData, textFieldsData])
  
  async function CharacterDetailsSection() {

    const placeHomelandField = getFieldByNameFromList(textFields.items, 'homeland')
    const placeWorkplaceField = getFieldByNameFromList(textFields.items, 'workplace')
    const placeHeritageField = getFieldByNameFromList(textFields.items, 'heritage')
    const characterNameField = getFieldByNameFromList(textFields.items, 'name')
    const wordsLiveByField = getFieldByNameFromList(textFields.items, 'words-to-live-by')

    const content = (
      <section>
        <h2>I am <ClickInput
          fieldId={characterNameField.id}
          characterId={characterNameField.characterId}
          fieldName={characterNameField.name}
          fieldType={characterNameField.type}
          fieldValue={characterNameField.value}
          /></h2>
        <h2>Call me if you need a&nbsp;
          <span data-tag="1" className="text-green-300">super&nbsp;</span>
          <span className="text-green-300">mechanic&nbsp;</span>
        </h2>
        <div>
          <h2>Places I call home</h2>
          <ul>
            <li><span>Heritage</span>: <ClickInput fieldId={placeHeritageField.id}
              characterId={placeHeritageField.characterId}
              fieldName={placeHeritageField.name}
              fieldType={placeHeritageField.type}
              fieldValue={placeHeritageField.value}/></li>
            <li><span>Homeland</span>: <ClickInput fieldId={placeHomelandField.id}
              characterId={placeHomelandField.characterId}
              fieldName={placeHomelandField.name}
              fieldType={placeHomelandField.type}
              fieldValue={placeHomelandField.value}/></li>
            <li><span>Workplace</span>: <ClickInput fieldId={placeWorkplaceField.id}
              characterId={placeWorkplaceField.characterId}
              fieldName={placeWorkplaceField.name}
              fieldType={placeWorkplaceField.type}
              fieldValue={placeWorkplaceField.value}/></li>
          </ul>
        </div>
        <h2>Words to live by</h2>
        <blockquote className="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <ClickInput fieldId={wordsLiveByField.id}
              characterId={wordsLiveByField.characterId}
              fieldName={wordsLiveByField.name}
              fieldType={wordsLiveByField.type}
              fieldValue={wordsLiveByField.value}/>
        </blockquote>
      </section>
    )

    return content
  }

  // @todo: Pass params to component. How?
  // @todo Make sure to Async with Syspense? We have SSG but for a new Character I have to speed up the loading.
  async function CharacterSkillsSection() {

    const content = (
      <section>
        <div>
          <div>

            {skills.items.map(skill => (
              <div key={`${skill.id}-block`}>
              <label
                htmlFor={`${skill.id}-0`}
              ><h4 className="text-xl">{skill.name}</h4></label>
              <RadioIncrementalSelect
                key={skill.id}
                fieldId={skill.id} characterId={skill.characterId}
                fieldType={skill.type} fieldValue={skill.value}
                fieldName={skill.name} valuesAmount={3}  />
              </div>
            ))}
          </div>
          
        </div>
      </section>
    )

    return content
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:text-white">
      
      {/* Character details */}
      <CharacterDetailsSection />

      {/* Skills */}
      <CharacterSkillsSection />

      {/* I feel */}
      <section>

      </section>

    </main>
  )
}

/**
 * SSG
 * @todo Cache newly created characters!
 * @returns 
 */
export async function generateStaticParams() {
  const charactersData : Promise<Character[]> = getAllCharacters()
  const characters: Character[] = await charactersData

  return (await charactersData).map(character => ({
    characterId: character.id,
  }))

}
