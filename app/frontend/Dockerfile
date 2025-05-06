# 1. Basis-Image
FROM node:18-alpine AS builder

# 2. Arbeitsverzeichnis setzen
WORKDIR /app

# 3. Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm ci

# 4. Quellcode kopieren
COPY . .

# 5. Next.js bauen
RUN npm run build

# 6. Produktions-Image
FROM node:18-alpine AS runner

# 7. Arbeitsverzeichnis setzen
WORKDIR /app

# 8. Abhängigkeiten nur für Produktion kopieren
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# 9. Gebauten Code kopieren
COPY --from=builder /app/.next ./.next
# Statisches Verzeichnis nur kopieren, wenn vorhanden
# Die public-Ordner-Kopie entfällt, falls Sie keine statischen Dateien haben
# COPY --from=builder /app/public ./public

# 10. Port setzen und Startkommando
EXPOSE 3000
CMD ["npm", "run", "start"]
