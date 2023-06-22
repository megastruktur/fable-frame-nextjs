import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
  id: string
  title: string
  date: string
  type: string
}

export default function PostPreview({id, title, date, type} : Props) {
  return (
    <div>
      <h2 className="text-xl"><Link className="text-white" href={`/posts/${type}/${id}`}>{title}</Link></h2>
      <p className="italic text-xs my-1">{getFormattedDate(date)}</p>
    </div>
  )
}
