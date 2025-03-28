FROM node:20-alpine

WORKDIR /app
COPY ./app ./app
COPY ./public ./public
COPY ./src ./src
COPY package.json tailwind.config.mjs postcss.config.mjs next.config.mjs jsconfig.json .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]