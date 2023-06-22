import getFormattedDate from "@/lib/getFormattedDate"
import { getPostByTypeAndId, getSortedPostsDataByType } from "@/lib/posts"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type Params = {
  params: {
    postType: string
    postId: string
  }
}


/**
 *
 *
 * @export
 * @param {Params} { params: { postType, postId } }
 * @return {*}  {Metadata}
 */
export function generateMetadata({ params: { postType, postId } }: Params): Metadata {

  const sortedPosts = getSortedPostsDataByType(postType)
  
  const post = sortedPosts.find(post => post.id === postId)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  else {
    return {
      title: post.title
    }
  }
}


/**
 *
 *
 * @export
 * @param {Params} { params: { postType, postId } }
 * @return {*} 
 */
export default async function PostPage({ params: { postType, postId } }: Params) {

  const sortedPosts = getSortedPostsDataByType(postType)

  if (!sortedPosts.find(post => post.id === postId)) {
    return notFound()
  }

  const {title, date, content} = await getPostByTypeAndId(postType, postId)
  const formattedDate = getFormattedDate(date)

  return (
    <section>
      <h1 className="mb-0">{title}</h1>
      <p className="italic text-xs my-1">{formattedDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </section>
    
  )
}
