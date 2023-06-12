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

  function CharacterSkill({ skill } : {skill: CharacterField}) {

    return (
      <label htmlFor={`${skill.id}-0`} className={"block"}>
        <h4 className="inline-block">{skill.name}</h4>

        <RadioIncrementalSelect
          fieldId={skill.id} characterId={skill.characterId}
          fieldType={skill.type} fieldValue={skill.value}
          fieldName={skill.name} valuesAmount={3}  />
      </label>
    )

  }

  // @todo: Pass params to component. How?
  // @todo Make sure to Async with Syspense? We have SSG but for a new Character I have to speed up the loading.
  function CharacterSkillsSection() {

    const fieldAction = getFieldByNameFromList(skills.items,'action')
    const fieldGuts = getFieldByNameFromList(skills.items,'guts')
    const fieldKnowledge = getFieldByNameFromList(skills.items,'knowledge')
    const fieldSociety = getFieldByNameFromList(skills.items,'society')
    const fieldWild = getFieldByNameFromList(skills.items,'wild')
    const fieldCrime = getFieldByNameFromList(skills.items,'crime')

    const skillFight = getFieldByNameFromList(skills.items,'fight')
    const skillLeadership = getFieldByNameFromList(skills.items,'leadership')
    const skillStunt = getFieldByNameFromList(skills.items,'stunt')
    const skillCool = getFieldByNameFromList(skills.items,'cool')
    const skillDrive = getFieldByNameFromList(skills.items,'drive')
    const skillShoot = getFieldByNameFromList(skills.items,'shoot')
    const skillCulture = getFieldByNameFromList(skills.items,'culture')
    const skillFirstAid = getFieldByNameFromList(skills.items,'first-aid')
    const skillTech = getFieldByNameFromList(skills.items,'tech')
    const skillCharm = getFieldByNameFromList(skills.items,'charm')
    const skillEloquence = getFieldByNameFromList(skills.items,'eloquence')
    const skillObservation = getFieldByNameFromList(skills.items,'observation')
    const skillScout = getFieldByNameFromList(skills.items,'scout')
    const skillSurvival = getFieldByNameFromList(skills.items,'survival')
    const skillTough = getFieldByNameFromList(skills.items,'tough')
    const skillAlert = getFieldByNameFromList(skills.items,'alert')
    const skillDexterity = getFieldByNameFromList(skills.items,'dexterity')
    const skillStealth = getFieldByNameFromList(skills.items,'stealth')


    const content = (
      <section>
        <div>
          <CharacterSkill skill={fieldAction} />
          <div>
            <CharacterSkill skill={skillFight} />
            <CharacterSkill skill={skillLeadership} />
            <CharacterSkill skill={skillStunt} />
          </div>
        </div>
        <hr />
        <div>
          <CharacterSkill skill={fieldGuts} />
          <div>
            <CharacterSkill skill={skillCool} />
            <CharacterSkill skill={skillDrive} />
            <CharacterSkill skill={skillShoot} />
          </div>
        </div>
        <hr />
        <div>
          <CharacterSkill skill={fieldKnowledge} />
          <div>
            <CharacterSkill skill={skillCulture} />
            <CharacterSkill skill={skillFirstAid} />
            <CharacterSkill skill={skillTech} />
          </div>
        </div>
        <hr />
        <div>
          <CharacterSkill skill={fieldSociety} />
          <div>
            <CharacterSkill skill={skillCharm} />
            <CharacterSkill skill={skillEloquence} />
            <CharacterSkill skill={skillObservation} />
          </div>
        </div>
        <hr />
        <div>
          <CharacterSkill skill={fieldWild} />
          <div>
            <CharacterSkill skill={skillScout} />
            <CharacterSkill skill={skillSurvival} />
            <CharacterSkill skill={skillTough} />
          </div>
        </div>
        <hr />
        <div>
          <CharacterSkill skill={fieldCrime} />
          <div>
            <CharacterSkill skill={skillAlert} />
            <CharacterSkill skill={skillDexterity} />
            <CharacterSkill skill={skillStealth} />
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
