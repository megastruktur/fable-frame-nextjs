import ClickInput from "../components/ClickInput"
import { getAllCharacters, loadCharacterFieldsByType, getFieldByNameFromList } from "@/lib/utils"
import RadioIncrementalSelect from "../components/RadioIncrementalSelect"
import { ListResult } from "pocketbase"
import { migrateCharacter } from "@/lib/character"

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

  // migrateCharacter(characterId) // load data from System
  
  async function CharacterDetailsSection() {

    const placeHomelandField = getFieldByNameFromList(textFields.items, 'homeland')
    const placeWorkplaceField = getFieldByNameFromList(textFields.items, 'workplace')
    const placeHeritageField = getFieldByNameFromList(textFields.items, 'heritage')
    const characterNameField = getFieldByNameFromList(textFields.items, 'name')
    const wordsLiveByField = getFieldByNameFromList(textFields.items, 'words-to-live-by')

    const content = (
      <div>
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
            <li><span>Heritage</span>: <ClickInput
              fieldId={placeHeritageField.id}
              characterId={placeHeritageField.characterId}
              fieldName={placeHeritageField.name}
              fieldType={placeHeritageField.type}
              fieldValue={placeHeritageField.value}/></li>
            <li><span>Homeland</span>: <ClickInput
              fieldId={placeHomelandField.id}
              characterId={placeHomelandField.characterId}
              fieldName={placeHomelandField.name}
              fieldType={placeHomelandField.type}
              fieldValue={placeHomelandField.value}/></li>
            <li><span>Workplace</span>: <ClickInput
              fieldId={placeWorkplaceField.id}
              characterId={placeWorkplaceField.characterId}
              fieldName={placeWorkplaceField.name}
              fieldType={placeWorkplaceField.type}
              fieldValue={placeWorkplaceField.value}/></li>
          </ul>
        </div>
        <h2>Words to live by</h2>
        <blockquote className="p-4 my-4 border-l-4 bg-gray-800 border-gray-500">
          <ClickInput
            fieldId={wordsLiveByField.id}
            characterId={wordsLiveByField.characterId}
            fieldName={wordsLiveByField.name}
            fieldType={wordsLiveByField.type}
            fieldValue={wordsLiveByField.value}/>
        </blockquote>
      </div>
    )

    return content
  }

  /**
   * Character Skill Component
   * @param param0 
   * @returns 
   */
  function CharacterSkill({ skill, labelClassName='', textClass='' } : {skill: CharacterField, labelClassName?: string, textClass?: string } ) {

    return (
      <label htmlFor={`${skill.id}-0`} className={`flex flex-row ${labelClassName}`}>
        <span className={`flex ${textClass}`}>{skill.name}</span>

        <RadioIncrementalSelect
          fieldId={skill.id} characterId={skill.characterId}
          fieldType={skill.type} fieldValue={skill.value}
          fieldName={skill.name} valuesAmount={3} textClass={textClass} />
      </label>
    )

  }

  // @todo Make sure to Async with Syspense? We have SSG but for a new Character I have to speed up the loading.
  function CharacterSkillsSection() {

    const skillsProperDict: Record<string, string[]> = {
      "action": ["fight", "leadership", "stunt"],
      "guts": ["cool", "drive", "shoot"],
      "knowledge": ["culture", "first-aid", "tech"],
      "society": ["charm", "eloquence", "observation"],
      "wild": ["scout", "survival", "tough"],
      "crime": ["alert", "dexterity", "stealth"],
    }


    const skillContent = (
      <div>
        {Object.keys(skillsProperDict).map((key: string) => {
          return (
            <div key={key}>
              <CharacterSkill
                skill={getFieldByNameFromList(skills.items, key)} labelClassName={"bg-slate-700 justify-start p-3"}
                textClass={"text-3xl"}
                />
              <div className="flex flex-col">
                {skillsProperDict[key].map((skill: string) => {
                    return (
                      <CharacterSkill
                        key={skill}
                        skill={getFieldByNameFromList(skills.items, skill)}
                        labelClassName={"justify-end"}
                        textClass={"text-2xl"}
                        />
                    )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )


    return skillContent
  }


  // Main Character Page HTML
  return (
    <main className="flex flex-row justify-around text-white bg-slate-600">
      
      {/* Skills */}
      <section className="flex border-slate-700 border-2 p-2 shadow-2xl rounded">
        <CharacterSkillsSection />
      </section>

      {/* Character details */}
      <section className="flex">
        <CharacterDetailsSection />
      </section>

      {/* I feel */}
      <section className="flex-row">

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
