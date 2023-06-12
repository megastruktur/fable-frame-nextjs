import { getFieldByNameFromList } from '@/lib/utils'
import { getCharacterFieldsBlueprintBySystemId } from '@/lib/system'
import { pb } from '@/lib/db'


/**
 * 
 * @param characterId string
 * @returns Character
 */
export async function loadCharacter(characterId: string) {

  const characterLoaded: Character= await pb.collection('characters').getOne(characterId)
  
  // Get the character from DB
  const loadedFields: CharacterField[] = await pb.collection('character_fields').getFullList<CharacterField>()

  const character : Character = {
    id: characterId,
    name: getFieldByNameFromList(loadedFields, 'name').value,
    systemId: characterLoaded.systemId,
    fields: loadedFields
  }

  return character
}

/**
 * Migrate Character Fields from System to Character.
 * @param characterId 
 * @returns 
 */
export async function migrateCharacter(characterId: string) {


  const character = await loadCharacter(characterId)

  const systemCharacterFields = await getCharacterFieldsBlueprintBySystemId(character.systemId)

  // Compare character.fields with systemCharacterFields and create a new list of fields which present in systemCharacterFields but not in character.fields
  const newFields: CharacterField[] = systemCharacterFields.filter(
    field => !getFieldByNameFromList(character.fields, field.name).id)

  pb.autoCancellation(false);
  // Create new fields in DB
  const insertPromises = newFields.map(field => {
    return pb.collection('character_fields').create({
      type: field.type,
      name: field.name,
      value: field.value,
      data: field.data,
      characterId: characterId
    })
  })

  Promise.all(insertPromises).then(() => {
    pb.autoCancellation(true);
  })
}
