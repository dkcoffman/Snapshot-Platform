FROM node:20-slim

WORKDIR /app

COPY package*.json postcss.config.js eslint.config.js ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]