import PocketBase from 'pocketbase'
export const pb = new PocketBase('http://127.0.0.1:8090')


/**
 * Retrieve specific field from Character.
 * @param character
 * @param fieldName 
 * @returns 
 */
export async function getCharacterField(character: any, fieldName: string) {
  return character.fields?.find((el: { type: string; id: string }) => `${el.type}.${el.id}` === fieldName)
}


export async function loadCharacterFieldsByType(characterId: string, type: string) {
  return pb.collection('character_fields').getList<CharacterField>(1, 50, {
    filter: `characterId = "${characterId}" && type = "${type}"`,
    '$cancelKey': `field-${type}-${characterId}`
  });
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
  // return pb.collection('character_fields').
}


export async function getAllCharacters() {
  return pb.collection('characters').getFullList<Character>({
    sort: '-created',
  });
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


export function getEmptyCharacterField(): CharacterField {
  return  {
    id: '',
    type: '',
    name: '',
    value: '',
    characterId: '',
  }
}
