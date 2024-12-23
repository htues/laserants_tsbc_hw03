FROM node:alpine

RUN apk add --no-cache bash postgresql-client && \
	npm install -g pnpm@8.15.6 && \
	pnpm --version

WORKDIR /app

COPY . .

COPY .env .env

COPY package.json ./
RUN pnpm install

EXPOSE 8012
EXPOSE 5173

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["pnpm", "run", "dev"]

#to run this file:
#docker build -f Dockerfile.db -t your-image-name .
#docker run --env-file .env your-image-name
#docker build -t hftamayo/ecommerce_monorepo:0.0.1 .

# if I'm using a monorepo please refer to this:
#docker network create ecommerce_network
#docker network ls
#docker build --no-cache -t hftamayo/ecommerce_monorepo:0.0.1 .
#docker run --name ecomonorepo --network ecommerce_network -p 8012:8012 -p 5173:5173 -d --env-file .env hftamayo/ecommerce_monorepo:0.0.1
