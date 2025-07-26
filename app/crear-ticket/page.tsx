import { TicketForm } from "@/components/ticket-form"

export default function CrearTicket() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Ticket</h1>
      <TicketForm />
    </div>
  )
}
