FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ARG ENV=dev

RUN if [ "$ENV" = "dev" ]; then \
      npm install; \
    else \
      npm install --production; \
    fi \

COPY . .

CMD ["node", "index.js"]