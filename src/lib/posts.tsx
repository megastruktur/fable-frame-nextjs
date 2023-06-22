import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"


export function getSortedPostsDataByType(type: string) {

  const postsDirectory = path.join(process.cwd(), "posts", type)
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData: Post[] = fileNames.map((fileName: string) => {
    const id = fileName.replace(".md", "")

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      id,
      title: data.title,
      date: data.date,
    }
  })
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)

}


export async function getPostByTypeAndId(type: string, id: string) {

  const filePath = path.join(process.cwd(), `posts/${type}/${id}.md`)

  const fileContents = fs.readFileSync(filePath, "utf8")

  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const blogPostWithHTML: Post & { content: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: processedContent.toString(),
  }

  return blogPostWithHTML
}
