import { notFound } from "next/navigation"
import { systemExists } from "@/lib/systemExists"

type Params = {
  params: {
    systemId: string
  }
}

export default function SystemPage({ params: { systemId } }: Params) {

  if (!systemExists(systemId)) {
    return notFound()
  }

  return (
    <div>New Character</div>
  )

}
