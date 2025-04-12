# Base Stage for both Dev and Prod
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force

# Development Stage with Hot Reload
FROM base AS dev
COPY . .
EXPOSE 5173 24687

CMD ["npm", "run", "dev", "--", "--host"]

# Production Build Stage
FROM base AS build
COPY . .
RUN npm run build

# Production Runtime (using Nginx for better performance)
FROM nginx:alpine AS prod
WORKDIR /user/share/ngix/html
COPY --from=build /app/dist .
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]