export const mockTickets = [
  {
    id: "1001",
    titulo: "Error al iniciar sesión",
    descripcion:
      "No puedo acceder a mi cuenta después de cambiar mi contraseña. He intentado restablecer la contraseña varias veces pero sigo recibiendo un error.",
    estado: "abierto",
    fecha: "2025-05-30T10:30:00",
    usuario: "Carlos Rodríguez",
    categoria: "tecnico",
    prioridad: "alta",
    comentarios: [
      {
        usuario: "Soporte Técnico",
        fecha: "2025-05-30T11:45:00",
        texto:
          "Hemos verificado su cuenta y parece que hay un problema con la sincronización de credenciales. Estamos trabajando para solucionarlo.",
      },
    ],
  },
  {
    id: "1002",
    titulo: "Solicitud de reembolso",
    descripcion:
      "Realicé un pago duplicado por error y necesito solicitar un reembolso del segundo cargo. El número de transacción es TX-9876543.",
    estado: "en-proceso",
    fecha: "2025-05-28T14:15:00",
    usuario: "María López",
    categoria: "facturacion",
    prioridad: "media",
    comentarios: [
      {
        usuario: "Departamento de Facturación",
        fecha: "2025-05-28T16:20:00",
        texto:
          "Hemos verificado la transacción duplicada. El reembolso ha sido procesado y debería reflejarse en su cuenta en 3-5 días hábiles.",
      },
      {
        usuario: "María López",
        fecha: "2025-05-29T09:10:00",
        texto: "Gracias por la rápida respuesta. Estaré atenta a que se refleje el reembolso.",
      },
    ],
  },
  {
    id: "1003",
    titulo: "Actualización de información de contacto",
    descripcion: "Necesito actualizar mi dirección de correo electrónico y número de teléfono en mi perfil.",
    estado: "resuelto",
    fecha: "2025-05-25T09:00:00",
    usuario: "Juan Martínez",
    categoria: "cuenta",
    prioridad: "baja",
    comentarios: [
      {
        usuario: "Atención al Cliente",
        fecha: "2025-05-25T10:30:00",
        texto:
          "Hemos actualizado su información de contacto según lo solicitado. Por favor, verifique que los cambios sean correctos.",
      },
      {
        usuario: "Juan Martínez",
        fecha: "2025-05-25T11:15:00",
        texto: "He verificado la información y todo está correcto. Gracias por su ayuda.",
      },
      {
        usuario: "Atención al Cliente",
        fecha: "2025-05-25T11:30:00",
        texto: "Perfecto. No dude en contactarnos si necesita algo más. Cerramos este ticket.",
      },
    ],
  },
  {
    id: "1004",
    titulo: "Problema con la descarga de facturas",
    descripcion:
      "No puedo descargar mis facturas del mes pasado. Cuando hago clic en el botón de descarga, la página muestra un error.",
    estado: "abierto",
    fecha: "2025-06-01T16:45:00",
    usuario: "Ana Gómez",
    categoria: "tecnico",
    prioridad: "media",
    comentarios: [],
  },
  {
    id: "1005",
    titulo: "Consulta sobre plan de suscripción",
    descripcion:
      "Estoy interesado en cambiar mi plan actual al plan premium. Quisiera saber qué beneficios adicionales obtendría y si hay alguna promoción disponible.",
    estado: "en-proceso",
    fecha: "2025-05-29T11:20:00",
    usuario: "Roberto Sánchez",
    categoria: "facturacion",
    prioridad: "baja",
    comentarios: [
      {
        usuario: "Ventas",
        fecha: "2025-05-29T13:40:00",
        texto:
          "Gracias por su interés en nuestro plan premium. Le hemos enviado un correo electrónico con toda la información sobre los beneficios y promociones actuales.",
      },
    ],
  },
]
