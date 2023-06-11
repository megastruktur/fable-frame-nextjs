type CharacterField = {
  id: string
  type: string
  name: string
  characterId: string
  value: string
}

type Character = {
  id: string
  name: string
  systemId: string
  fields?: Array<CharacterField>
}

type RPGSystem = {
  id: string
  name: string
}
