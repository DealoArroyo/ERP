import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TicketDetail } from "@/components/ticket-detail"

export default function TicketPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <Link href="/">
        <Button variant="outline" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </Link>
      <TicketDetail id={params.id} />
    </div>
  )
}
