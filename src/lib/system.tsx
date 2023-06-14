import path from "path"
import { pb } from '@/lib/db'

// /**
//  * 
//  * @param systemName 
//  * @returns 
//  */
// export async function loadSystemSettings(systemName: string) {

//   const fs = require("fs")
//   const yaml = require("js-yaml")
//   const systemYamlPath = path.join(process.cwd(), "data", "systems", systemName, "system.yaml")


//   try {
//       const systemYaml = await fs.readFile(systemYamlPath, "utf8")
//       return yaml.load(systemYaml)
//   }
//   catch (err) {
//       console.log(err)
//   }

//   return undefined
// }

// export async function getCharacterFieldsBlueprintBySystemId(systemId: string) {

//   // Get the Name from DB.
//   const ttrpgSystemDb: TTRPGSystem = await pb.collection('rpg_systems').getOne(systemId)

//   // Load the System from file.
//   const system: TTRPGSystem = await loadSystemSettings(ttrpgSystemDb.name)

//   return system.character.fields
// }

