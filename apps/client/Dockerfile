FROM node:alpine

WORKDIR /client

RUN npm install -g pnpm@8.15.6

RUN pnpm --version

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 5173

CMD["pnpm", "run", "dev"]