"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useTickets } from "@/lib/ticket-context"
import type { TicketCategory, TicketPriority } from "@/lib/ticket-context"

export function TicketForm() {
  const router = useRouter()
  const { addTicket } = useTickets()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "" as TicketCategory,
    prioridad: "" as TicketPriority,
    descripcion: "",
    usuario: "Usuario Actual", // En una app real, esto vendría del sistema de autenticación
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!formData.titulo || !formData.categoria || !formData.prioridad || !formData.descripcion) {
      setError("Por favor completa todos los campos")
      return
    }

    setIsSubmitting(true)

    try {
      // Ahora realmente añadimos el ticket usando el contexto
      await addTicket({
        titulo: formData.titulo,
        categoria: formData.categoria as TicketCategory,
        prioridad: formData.prioridad as TicketPriority,
        descripcion: formData.descripcion,
        usuario: formData.usuario,
      })

      // Redireccionar a la página principal
      router.push("/")
    } catch (err) {
      setError("Ocurrió un error al crear el ticket")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Información del Ticket</CardTitle>
          <CardDescription>Completa el formulario para crear un nuevo ticket de soporte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Describe brevemente el problema"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                <SelectTrigger id="categoria">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnico">Soporte Técnico</SelectItem>
                  <SelectItem value="facturacion">Facturación</SelectItem>
                  <SelectItem value="cuenta">Cuenta</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select value={formData.prioridad} onValueChange={(value) => handleChange("prioridad", value)}>
                <SelectTrigger id="prioridad">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baja">Baja</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe detalladamente el problema o solicitud"
              rows={5}
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear Ticket"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
