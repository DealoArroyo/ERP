import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TicketList } from "@/components/ticket-list"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Tickets</h1>
          <p className="text-muted-foreground">Gestiona tus tickets de soporte</p>
        </div>
        <Link href="/crear-ticket">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Ticket
          </Button>
        </Link>
      </div>
      <TicketList />
    </div>
  )
}
