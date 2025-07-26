"use client"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useTickets } from "@/lib/ticket-context"

export function TicketList() {
  const [filter, setFilter] = useState("todos")
  const router = useRouter()
  const { tickets } = useTickets()

  const filteredTickets = filter === "todos" ? tickets : tickets.filter((ticket) => ticket.estado === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="abierto">Abiertos</SelectItem>
            <SelectItem value="en-proceso">En Proceso</SelectItem>
            <SelectItem value="resuelto">Resueltos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No hay tickets que mostrar</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ticket.titulo}</CardTitle>
                  <StatusBadge status={ticket.estado} />
                </div>
                <CardDescription>
                  Ticket #{ticket.id} • {formatDate(ticket.fecha)}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="line-clamp-3">{ticket.descripcion}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-3 pb-1">
                <div className="text-sm text-muted-foreground">Por: {ticket.usuario}</div>
                <Button variant="ghost" size="sm" onClick={() => router.push(`/ticket/${ticket.id}`)}>
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "abierto":
      return <Badge variant="default">Abierto</Badge>
    case "en-proceso":
      return <Badge variant="secondary">En Proceso</Badge>
    case "resuelto":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Resuelto
        </Badge>
      )
    default:
      return null
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}
