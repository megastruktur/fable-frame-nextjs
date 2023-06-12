import path from "path"
import { promises as fs } from 'fs'

export default async function getCharacterFieldsBlueprint(systemId: string) {

    const yaml = require("js-yaml")
    const systemYamlPath = path.join(process.cwd(), "data", "systems", systemId, "system.yaml")
    let characterFields : CharacterField[] = []
    try {
        const systemYaml = await fs.readFile(systemYamlPath, "utf8")

        const TTRPGSystem : TTRPGSystem = yaml.load(systemYaml)

        characterFields = TTRPGSystem.character.fields

    }
    catch (err) {
        console.error(err)
        return null
    }

    return characterFields

}
