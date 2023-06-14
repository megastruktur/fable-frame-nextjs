import { pb } from '@/lib/db'


export async function getAllCharacters() {
  return pb.collection('characters').getFullList<Character>({
    sort: '-created',
  });
}

