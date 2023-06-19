// https://SITE/api/revalidate?secret=MY_SECRET_TOKEN
// http://localhost:3000/api/revalidate?path=/&secret=MY_SECRET_TOKEN
// As per https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
//  the ondemand revalidation has to be in /pages/api/...

import { NextApiRequest, NextApiResponse } from "next"
import { revalidatePath } from 'next/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    res.statusCode = 401
    return res.json({ message: "Invalid token" })
  }
  else {
    const path = req.query.path as string
    revalidatePath(path)
    res.statusCode = 200
    return res.json({ revalidatedPath: true })
  }
}
