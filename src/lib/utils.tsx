import { pb } from '@/lib/db'


export async function getAllCharacters() {
  return pb.collection('characters').getFullList<Character>();
}


export async function revalidateCall(path: string) {

  console.log('revalidateCall', path)
  const token = process.env.MY_SECRET_TOKEN || ""
  const url = (
    `${process.env.BASE_URL}/api/revalidate?` +
    new URLSearchParams({
      path: path,
      secret: token
    })
  )

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(await res.text())
  }

  return res.json()
}
