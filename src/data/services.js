export const servicesData = {
  canada: {
    title: 'Empleo en Canadá',
    displayText: 'Busco Empleo En Canadá',
    tabText: 'Ver Ruta 1',
    checklistTitle: 'Si tu busqueda de empleo se siente como:',
    painPoints: [
      'Tengo CV, pero no genera llamadas.',
      'Mi perfil no está adaptado al mercado canadiense.',
      'Aplico a vacantes, pero LinkedIn no me da visibilidad.',
      'No tengo experiencia laboral canadiense y no sé cómo compensarlo.',
      'No sé si estoy aplicando a los roles correctos.',
      'Llego a entrevistas, pero no avanzo.'
    ],
    plans: [
      {
        name: 'Plan Profesional',
        price: '$299/mes',
        features: [
          '4 sesiones de coaching',
          'Optimización de LinkedIn y CV',
          'Simulación de entrevistas',
          'Acceso a red de contactos'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Plan Profesional para Canadá',
        buttonText: 'Comenzar Ahora',
        featured: true
      },
      {
        name: 'Plan Canada VIP',
        price: '$499/mes',
        features: [
          'Todo Plan Profesional +',
          'Asesoría migratoria personalizada',
          'Búsqueda laboral local',
          'Preparación cultural',
          'Red exclusiva de contactos en Canadá'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Plan Canada VIP',
        buttonText: 'Más Información',
        featured: false
      },
      {
        name: 'Plan Premium Canada',
        price: '$699/mes',
        features: [
          'Todo Plan Canada VIP +',
          'Acompañamiento completo',
          'Soporte prioritario 24/7',
          'Garantía de resultados',
          'Acceso exclusivo a eventos'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Plan Premium Canada',
        buttonText: 'Solicitar Info',
        featured: false
      }
    ]
  },
  it: {
    title: 'Transición a IT',
    displayText: 'Quiero Transicionar a IT',
    tabText: 'Ver Ruta 2',
    checklistTitle: 'Si tu transicion a IT se siente como:',
    painPoints: [
      'No tengo experiencia técnica',
      'No sé qué tecnología aprender',
      'Mi edad puede ser un impedimento'
    ],
    plans: [
      {
        name: 'Plan Profesional',
        price: '$299/mes',
        features: [
          '4 sesiones de coaching',
          'Optimización de LinkedIn y CV',
          'Simulación de entrevistas',
          'Acceso a red de contactos'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Plan Profesional para IT',
        buttonText: 'Comenzar Ahora',
        featured: true
      },
      {
        name: 'Mentoría IT',
        price: '$399/mes',
        features: [
          'Mentor IT personalizado',
          'Plan de estudio adaptado',
          'Proyectos prácticos',
          'Conexiones en la industria',
          'Preparación técnica específica'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Mentoría IT',
        buttonText: 'Explorar Programa',
        featured: false
      },
      {
        name: 'Bootcamp IT Intensivo',
        price: '$599/mes',
        features: [
          'Todo Mentoría IT +',
          'Programa intensivo acelerado',
          'Portfolio profesional completo',
          'Certificaciones incluidas',
          'Job placement assistance'
        ],
        whatsappUrl: 'wa.me/1234567890?text=Interesado en Bootcamp IT Intensivo',
        buttonText: 'Ver Detalles',
        featured: false
      }
    ]
  }
}

// Helper function to generate WhatsApp URLs
export const generateWhatsAppUrl = (path, planName) => {
  const pathData = servicesData[path]
  if (!pathData) return '#'
  
  const plan = pathData.plans.find(p => p.name === planName)
  return plan ? plan.whatsappUrl : '#'
}
