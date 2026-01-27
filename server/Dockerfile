FROM node:22-bullseye

# Install ARM-native Chromium and its support libraries
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Skip downloading the Intel-version of Chrome during npm install
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN chown -R node:node /app
USER node

EXPOSE 5000
CMD ["node", "index.js"]
