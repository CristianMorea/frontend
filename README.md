
#  Documentación Frontend - Aplicación de Procesamiento de Texto


# Visión General
- aplicacion en funcionamiento 
![alt text](/src/assets/AplicaiconFuncional.pngg)
nterfaz Vue.js para consumir la API de procesamiento de texto, con capacidad para:

- Resumir documentos (PDF/TXT)
- Traducir contenido (implementación futura)
- Visualizar resultados con opciones de exportación
## 🛠 Tecnologías Clave

- Vue 3	Framework base	3.x
- Vue Router	Navegación SPA	4.x
- Axios	Comunicación con API	1.x
- Mermaid.js	Diagramas en documentación	9.x

## Componentes principales

1. TextInput.vue
Responsabilidad: Captura de texto/archivos



Emits:

- @text-change: Texto actualizado
- @file-upload: Archivo válido cargado

2. ActionSelector.vue
- Responsabilidad: Selección de acción a ejecutar
![alt text](/src/assets/ActionSelector.png)


3. ResultDisplay.vue
Flujo de Estados:

Funcionalidades:

- Visualización de resultados

- Copiado a portapapeles

- Descarga como archivo .txt

- Manejo de errores
## 🔄 Flujo de Datos Principal
- Diagrama de secuencia 
![alt text](/src/assets/FlujoPrincipal.png)
## Estructura de Archivos
- carpetas 
![alt text](/src/assets/Estructura%20de%20archivos.png)
## 📝 Mejoras Futuras
- Implementar traducción UI

- Añadir vista de historial

- Soporte para más formatos (DOCX)

- Internacionalización (i18n)