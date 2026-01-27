FROM ghcr.io/puppeteer/puppeteer:latest
USER root
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN chown -R pptruser:pptruser /app
USER pptruser
EXPOSE 5000
CMD ["node", "index.js"]
