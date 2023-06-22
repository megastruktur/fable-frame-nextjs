import { getSortedPostsDataByType } from "@/lib/posts"
import PostPreview from "./PostPreview"

type Props = {
  type: string
}

export default function Posts({ type }: Props) {

  // @todo Add SSG
  const blogs: Post[] = getSortedPostsDataByType(type)

  return (
    <section className="flex flex-col w-full items-center">
      <h1 className="text-4xl flex font-bold text-white/90 capitalize mb-10">{type}</h1>
      <div className="flex flex-col">
        {blogs.map(({id, title, date}) => (
          <PostPreview key={id} id={id} title={title} date={date} type={type}/>
        ))}
      </div>

    </section>
  )
}
