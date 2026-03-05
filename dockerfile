# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar el código fuente
COPY src/ ./src/

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el código compilado desde la etapa builder
COPY --from=builder /app/dist ./dist

# Exponer el puerto
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]