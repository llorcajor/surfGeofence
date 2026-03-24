# Usar una imagen ligera de Node.js
FROM node:20-alpine

# Crear directorio de trabajo en el contenedor. Es decir, el contenedor se ejecutará dentro de este directorio.
WORKDIR /app

# Copiar archivos de dependencias. Se copia desde local al contenedor.
COPY package*.json ./

# Instalar dependencias del proyecto. Se ejecuta dentro del contenedor.
RUN npm install

# Copiar el resto del código del proyecto al contenedor.
COPY . .

# Exponer el puerto del backend para que pueda ser accedido desde fuera del contenedor.
EXPOSE 3000

# Comando para iniciar en modo desarrollo con nodemon. Se ejecuta dentro del contenedor.
CMD ["npm", "start"]