import axios from 'axios'

const API_URL = 'https://prueva-tecnica.onrender.com/api/v1/summarize' 

export async function obtenerResumen({ archivo }) {
  const formData = new FormData()
  if (archivo) formData.append('file', archivo)
  
  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}
