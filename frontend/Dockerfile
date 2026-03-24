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

# Vite usa el puerto 5173 por defecto
EXPOSE 5173

# Exponer el host para que sea accesible desde fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host"]