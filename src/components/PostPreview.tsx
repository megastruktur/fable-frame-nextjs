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
    <div className="flex flex-row items-center">
      <p className="flex italic text-sm mr-3">{getFormattedDate(date)}</p>
      <h2 className="flex text-xl">
        <Link className="text-white" href={`/posts/${type}/${id}`}>{title}</Link>
      </h2>
    </div>
  )
}
