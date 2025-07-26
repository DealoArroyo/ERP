import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TicketProvider } from "@/lib/ticket-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Tickets",
  description: "Sistema de gestión de tickets de soporte",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <TicketProvider>{children}</TicketProvider>
      </body>
    </html>
  )
}
