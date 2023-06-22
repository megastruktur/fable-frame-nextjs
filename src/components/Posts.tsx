import { getSortedPostsDataByType } from "@/lib/posts"
import PostPreview from "./PostPreview"

type Props = {
  type: string
}

export default function Posts({ type }: Props) {

  const blogs: Post[] = getSortedPostsDataByType(type)

  return (
    <section className="mt-6 mx-auto max-w-2xl">
      <h2 className="text-4xl font-bold text-white/90 capitalize">{type}</h2>
      <ul className="w-full">
        {blogs.map(({id, title, date}) => (
          <PostPreview key={id} id={id} title={title} date={date} type={type}/>
        ))}
      </ul>

    </section>
  )
}
