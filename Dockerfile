FROM node:22
WORKDIR /t-flora.github.io

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
CMD ["npm", "start"]