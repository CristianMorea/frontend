import axios from 'axios'

const API_URL = 'https://prueva-tecnica.onrender.com/api/v1/summarize'

export async function obtenerResumen({ archivo }) {
  if (!archivo) {
    throw new Error('No se ha proporcionado un archivo para resumir.')
  }

  const formData = new FormData()
  formData.append('file', archivo)

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data // Asegúrate de que el backend devuelva { summary: "...", ... }
  } catch (error) {
    const mensaje =
      error.response?.data?.detail ||
      error.message ||
      'Error al procesar el resumen.'
    throw new Error(mensaje)
  }
}
