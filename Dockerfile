FROM node:20-alpine as builder

ENV NODE_ENV build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm i

RUN npm run build 

FROM node:20-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/
COPY .env ./

EXPOSE 3000

CMD ["node", "dist/main.js"]