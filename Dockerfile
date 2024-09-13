FROM node:alpine

RUN npm install -g pnpm@8.15.6

RUN pnpm --version

WORKDIR /app

COPY . .

COPY package.json ./
RUN pnpm install

WORKDIR /app/apps/server
RUN pnpm prisma generate

WORKDIR /app

EXPOSE 8012
EXPOSE 5173

CMD ["pnpm", "run", "dev"]

#to run this file:
#docker build -f Dockerfile.db -t your-image-name .
#docker run --env-file .env your-image-name
#docker build -t hftamayo/ecommerce_monorepo:0.0.1 .
#docker run --name ecomonorepo -p 8012:8012 -p 5173:5173 -d --env-file .env hftamayo/ecommerce_monorepo:0.0.1    