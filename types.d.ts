type CharacterField = {
  id: string
  type: string
  name: string
  characterId: string
  value: string
  data?: string
}

type Character = {
  id: string
  systemId: string // load systemId from rpg_systems
  fields: CharacterField[]
}

type CharacterSystemData = {
  fields: CharacterField[]
}

type CompendiumSystemData = {
  fields: CharacterField[]
}

type TTRPGSystem = {
  name: string
  called: string
  compendium: CompendiumSystemData
  character: CharacterSystemData
}
