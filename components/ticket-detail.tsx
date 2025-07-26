"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, MessageSquare, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTickets } from "@/lib/ticket-context"
import type { TicketStatus } from "@/lib/ticket-context"

export function TicketDetail({ id }: { id: string }) {
  const router = useRouter()
  const { tickets, updateTicketStatus, addComment } = useTickets()
  const ticket = tickets.find((t) => t.id === id)

  const [status, setStatus] = useState<TicketStatus>(ticket?.estado || "abierto")
  const [comment, setComment] = useState("")

  if (!ticket) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Ticket no encontrado</h2>
        <p className="text-muted-foreground mb-6">El ticket que buscas no existe o ha sido eliminado</p>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </div>
    )
  }

  const handleStatusChange = (newStatus: TicketStatus) => {
    setStatus(newStatus)
    updateTicketStatus(id, newStatus)
  }

  const handleAddComment = () => {
    if (!comment.trim()) return

    addComment(id, {
      usuario: "Usuario Actual", // En una app real, esto vendría del sistema de autenticación
      texto: comment,
    })

    setComment("")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{ticket.titulo}</CardTitle>
              <CardDescription>
                Ticket #{ticket.id} • Creado el {formatDate(ticket.fecha)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Estado:</span>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abierto">Abierto</SelectItem>
                  <SelectItem value="en-proceso">En Proceso</SelectItem>
                  <SelectItem value="resuelto">Resuelto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard icon={<User className="h-4 w-4" />} label="Solicitante" value={ticket.usuario} />
            <InfoCard
              icon={<Clock className="h-4 w-4" />}
              label="Prioridad"
              value={
                <Badge
                  className={
                    ticket.prioridad === "alta"
                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                      : ticket.prioridad === "media"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {capitalizeFirst(ticket.prioridad)}
                </Badge>
              }
            />
            <InfoCard
              icon={<MessageSquare className="h-4 w-4" />}
              label="Categoría"
              value={capitalizeFirst(ticket.categoria)}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Descripción</h3>
            <div className="p-4 bg-muted rounded-md">
              <p>{ticket.descripcion}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Historial de comentarios</h3>
            {ticket.comentarios && ticket.comentarios.length > 0 ? (
              <div className="space-y-4">
                {ticket.comentarios.map((comment, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{comment.usuario}</span>
                      <span className="text-sm text-muted-foreground">{formatDate(comment.fecha)}</span>
                    </div>
                    <p>{comment.texto}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay comentarios todavía</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Añadir un comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment}>Añadir comentario</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex flex-col p-4 border rounded-md">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <div className="font-medium">{value}</div>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
