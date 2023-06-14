// import { getCharacterFieldsBlueprintBySystemId } from '@/lib/system'
import { pb } from '@/lib/db'


/**
 * 
 * @param characterId string
 * @returns Promise<Character>
 */
export async function loadCharacter(characterId: string): Promise<Character> {

  const characterLoaded: Character= await pb.collection('characters').getOne(characterId)
  
  // Get the character from DB
  const loadedFields: CharacterField[] = await pb.collection('character_fields').getFullList<CharacterField>()

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
  console.log(fieldName)
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


export async function loadCharacterFieldsByType(characterId: string, type: string) {
  return pb.collection('character_fields').getList<CharacterField>(1, 50, {
    filter: `characterId = "${characterId}" && type = "${type}"`,
    '$cancelKey': `field-${type}-${characterId}`
  });
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
