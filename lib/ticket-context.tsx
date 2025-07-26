"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { mockTickets } from "@/lib/data"

// Definir tipos
export type TicketStatus = "abierto" | "en-proceso" | "resuelto"
export type TicketPriority = "baja" | "media" | "alta" | "urgente"
export type TicketCategory = "tecnico" | "facturacion" | "cuenta" | "otro"

export interface Comment {
  usuario: string
  fecha: string
  texto: string
}

export interface Ticket {
  id: string
  titulo: string
  descripcion: string
  estado: TicketStatus
  fecha: string
  usuario: string
  categoria: TicketCategory
  prioridad: TicketPriority
  comentarios: Comment[]
}

interface TicketContextType {
  tickets: Ticket[]
  addTicket: (ticket: Omit<Ticket, "id" | "fecha" | "estado" | "comentarios">) => Promise<void>
  updateTicketStatus: (id: string, status: TicketStatus) => void
  addComment: (id: string, comment: Omit<Comment, "fecha">) => void
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)

  const addTicket = async (newTicketData: Omit<Ticket, "id" | "fecha" | "estado" | "comentarios">) => {
    // Simular un retraso de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newTicket: Ticket = {
      ...newTicketData,
      id: `${1000 + tickets.length + 1}`,
      fecha: new Date().toISOString(),
      estado: "abierto",
      comentarios: [],
    }

    setTickets((prevTickets) => [...prevTickets, newTicket])
  }

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === id ? { ...ticket, estado: status } : ticket)),
    )
  }

  const addComment = (id: string, commentData: Omit<Comment, "fecha">) => {
    const newComment: Comment = {
      ...commentData,
      fecha: new Date().toISOString(),
    }

    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, comentarios: [...(ticket.comentarios || []), newComment] } : ticket,
      ),
    )
  }

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, addComment }}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets() {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error("useTickets debe ser usado dentro de un TicketProvider")
  }
  return context
}
