# Dockerfile

# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el archivo de clonación
COPY clonador.js .

# Expone el puerto (si es necesario, ajustar según la aplicación)
EXPOSE 3000

# Comando para ejecutar el script
CMD ["node", "clonador.js"]
