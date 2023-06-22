import { getCharacterFieldsBlueprintBySystemName, listLoadedSystems } from '@/lib/system'
import { pb } from '@/lib/db'
import { revalidateCall } from './utils'


/**
 * 
 * @param characterId string
 * @returns Promise<Character>
 */
export async function loadCharacter(characterId: string): Promise<Character> {

  const characterLoadedQ: Promise<Character>= pb.collection('characters').getOne(characterId)

  const fieldsQ: Promise<CharacterField[]> = pb.collection('character_fields').getFullList<CharacterField>({
    filter: `characterId="${characterId}"`
  })

  const [characterLoaded, loadedFields]: [Character, CharacterField[]] = await Promise.all([characterLoadedQ, fieldsQ])

  const character : Character = {
    id: characterId,
    systemId: characterLoaded.systemId,
    fields: loadedFields
  }

  return character
}


/**
 * Save or create the Character Field
 * @todo Investigate how to pass the whole object (next-superjson-plugin ?)
 * @returns 
 */
export async function saveFieldValue(fieldId: string, value: any, characterId: string) {

  const record = await pb.collection('character_fields').update(fieldId, {
    value: value
  })

  console.log("Value: ", value)
  console.log("Field is being saved: ", fieldId)
}


/**
 *
 *
 * @export
 * @return {*}  {CharacterField}
 */
export function getEmptyCharacterField(): CharacterField {
  return  {
    id: '',
    type: '',
    name: '',
    value: '',
    characterId: '',
  }
}

/**
 * This function won't test for type. Name filter only!
 * @param fieldList
 * @param fieldName 
 */
export function getFieldByNameFromList(fieldList: CharacterField[], fieldName: string):CharacterField {
  let field = fieldList.find(field => field.name === fieldName)

  return field ? field : getEmptyCharacterField()
}


/**
 *
 *
 * @param {CharacterField[]} fieldList
 * @param {string} fieldType
 * @param {string} fieldName
 * @return {*}  {CharacterField}
 */
export function getFieldByTypeAndNameFromList(fieldList: CharacterField[], fieldType: string, fieldName: string):CharacterField {
  let field = fieldList.find(field => field.type === fieldType && field.name === fieldName)

  return field? field : getEmptyCharacterField()
}

/**
 * Retrieve specific field from Character.
 * @param character
 * @param fieldName 
 * @returns 
 */
export async function getCharacterField(character: Character, fieldName: string) {
  return character.fields?.find((el: { type: string; id: string }) => `${el.type}.${el.id}` === fieldName)
}


// export async function loadCharacterFieldsByType(characterId: string, type: string) {
//   return pb.collection('character_fields').getFullList<CharacterField>({
//     filter: `characterId = "${characterId}" && type = "${type}"`,
//     '$cancelKey': `field-${type}-${characterId}`
//   });
// }

/**
 * @todo Add Pagination.
 * @returns 
 */
export async function loadAllCharactersWithSystemAndName(): Promise<LoadedCharacter[]> {
  
  const res = await pb.collection("character_fields").getFullList({
    filter: `type = "text" && name = "name"`,
    expand: "characterId.systemId",
  })

  return res.map((el) => {
    return {
      characterName: el.value,
      characterId: el.characterId,
      // @ts-ignore
      systemName: el.expand.characterId.expand.systemId.name,
    }
  })
}

/**
 *
 *
 * @export
 * @param {Character} character
 * @param {string} type
 * @return {*} 
 */
export function getCharacterFieldsByType(character: Character, type: string) {
  return character.fields.filter((el: CharacterField) => el.type === type)
}

/**
 * Create a character and return the ID.
 * @param systemName 
 * @returns string CharacterId
 */
export async function createNewCharacter(systemName: string): Promise<string> {

  // Get the system fields from system config.
  const systemCharacterFieldsQ = getCharacterFieldsBlueprintBySystemName(systemName)
  // Create new Character

  const [systemCharacterFields, loadedSystems] = await Promise.all([systemCharacterFieldsQ, listLoadedSystems()])

  const characterSystem = loadedSystems.find((el: any) => el.systemName === systemName)

  // If system not found - throw Exception.
  if (!characterSystem) {
    throw new Error(`System ${systemName} not found`)
  }

  const characterCreationData = {
      "systemId": characterSystem.systemId
  };

  const record = await pb.collection('characters').create(characterCreationData);


  // Create new fields in DB
  const insertPromises = systemCharacterFields.map(field => {

    const fieldData = {
      type: field.type,
      name: field.name,
      value: field.value,
      data: field.data,
      characterId: record.id
    }

    // @todo if name - insert some default name.
    if (field.name === 'name') {
      fieldData.value = "New Character"
    }

    return pb.collection('character_fields').create(fieldData)
  })

  Promise.all(insertPromises).then(() => {
    pb.autoCancellation(true);
  })

  return record.id
}

/**
 * 
 * @param characterId 
 * @returns 
 */
export async function deleteCharacter(characterId: string) {
  const character = pb.collection('characters').delete(characterId)
  // revalidateCall("/characters")
  return character
}

// /**
//  * Migrate Character Fields from System to Character.
//  * @param characterId 
//  * @returns 
//  */
// export async function migrateCharacter(characterId: string) {


//   const character = await loadCharacter(characterId)

//   const systemCharacterFields = await getCharacterFieldsBlueprintBySystemId(character.systemId)

//   // Compare character.fields with systemCharacterFields and create a new list of fields which present in systemCharacterFields but not in character.fields
//   const newFields: CharacterField[] = systemCharacterFields.filter(
//     field => !getFieldByNameFromList(character.fields, field.name).id)

//   pb.autoCancellation(false);
//   // Create new fields in DB
//   const insertPromises = newFields.map(field => {
//     return pb.collection('character_fields').create({
//       type: field.type,
//       name: field.name,
//       value: field.value,
//       data: field.data,
//       characterId: characterId
//     })
//   })

//   Promise.all(insertPromises).then(() => {
//     pb.autoCancellation(true);
//   })
// }
