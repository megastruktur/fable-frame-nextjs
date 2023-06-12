import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'

export const revalidate = 0

export default async function ListSystemsPage() {

  const systemsDirs = path.join(process.cwd(), 'data', 'systems')
  const dirnames = await fs.readdir(systemsDirs)

  return (
    <main className="flex min-h-screen flex-col items-center p-24 dark:text-white">
      <h1>Import System</h1>
      <ul>
        {dirnames.map(dir => (
          <li key={dir}>
            <Link href={`/import/${dir}`}>{dir}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
