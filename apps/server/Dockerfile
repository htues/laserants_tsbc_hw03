FROM node:alpine

WORKDIR /server

RUN npm install -g pnpm@8.15.6

RUN pnpm --version

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 8012

CMD["pnpm", "run", "dev"]