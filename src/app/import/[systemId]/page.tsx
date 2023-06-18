import path from "path"
import { promises as fs } from 'fs'

type Params = {
  params: {
    systemId: string
  }
}


export default async function ImportSystemPage({ params: { systemId } }: Params) {

  const yaml = require('js-yaml');

  const systemPath = path.join(process.cwd(), 'data', 'systems', systemId)
  
  // Read the system.yaml file from systemPath if it exists
  const systemYaml = await fs.readFile(path.join(systemPath,'system.yaml'), 'utf8')

  // Parse the system.yaml file
  const system: TTRPGSystem = yaml.load(systemYaml)

  

  console.log(system)

  return (
    <div>
      <h1>Import System</h1>
      <pre>{systemYaml}</pre>
    </div>
  )
}
