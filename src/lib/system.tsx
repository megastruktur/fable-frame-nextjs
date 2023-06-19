import { pb } from '@/lib/db'

/**
 *
 *
 * @export
 * @param {string} systemId
 * @return {*}  {Promise<TTRPGSystem>}
 */
export async function loadSystem(systemId: string): Promise<TTRPGSystem> {
  return pb.collection('rpg_systems').getOne(systemId)
}

export async function getCharacterFieldsBlueprintBySystemId(systemId: string) {

  // Get the Name from DB.
  const ttrpgSystemDb: TTRPGSystem = await pb.collection('rpg_systems').getOne(systemId)

  return getCharacterFieldsBlueprintBySystemName(ttrpgSystemDb.name)
}

export async function getCharacterFieldsBlueprintBySystemName(systemName: string) {
  // Load the System from file.
  const system: TTRPGSystem = await loadSystemSettings(systemName)

  return system.character.fields
}

/**
 * List all Enabled systems.
 * @returns 
 */
export async function listLoadedSystems(): Promise<{systemId: string, systemName: string}[]> {
  const systems = await pb.collection('rpg_systems').getFullList()
  return systems.map(system => {
    return {
      systemName: system.name,
      systemId: system.id
    }
  })
}

/**
 * @todo Make sure to load the system yaml into the data DB field.
 * @param systemName
 * @returns 
 */
export default async function loadSystemSettings(systemName: string) {

  const yaml = require("js-yaml")

  const system = await pb.collection("rpg_systems").getFirstListItem(`name="${systemName}"`)

  if (!system) {
    return undefined
  }
  else {
    if (system.data) {
      return yaml.load(system.data)
    }
    else {
      return undefined
    }
  }
}

