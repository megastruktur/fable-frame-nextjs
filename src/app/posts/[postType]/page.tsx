import Posts from "@/components/Posts"

type Params = {
  params: {
    postType: string
  }
}

export default function PostsTypePage({params: { postType }}: Params) {
  return (
    <Posts type={postType} />
  )
}
