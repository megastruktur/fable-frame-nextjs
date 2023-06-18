import Link from "next/link"
import { LoadedCharacter, loadAllCharactersWithSystemAndName } from "@/lib/character"

export async function generateMetadata() {
  return {
    title: "All characters",
    description: "The list of all characters",
  }
}

export default async function CharactersPage() {

  const chars: LoadedCharacter[] = await loadAllCharactersWithSystemAndName()

  const content = (
    <>
      <table className="w-full text-left">
        <thead className="text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">System</th>
          </tr>
        </thead>
        <tbody>
          {chars.map(char => (
            <tr className="border-b" key={char.characterId}>
              <td>
                <Link href={`/characters/${char.characterId}`}>{char.characterName}</Link>
              </td>
              <td>{char.systemName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
  return (
    <>
    <h1>Welcome, Traveller! All your characters are here.</h1>
    {content}
    </>
  )
}
