# Stage 1: Build React frontend
FROM node:18-slim AS build-frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Production server
FROM node:18-slim
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production
COPY server/ ./server/
COPY --from=build-frontend /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
EXPOSE 8080

CMD ["node", "server/index.js"]
