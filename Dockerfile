FROM node:alpine
LABEL version="1.0"
WORKDIR /home/node/app
COPY package.json ./
RUN npm install
COPY . .
USER node
CMD [ "npm", "run", "server" ]
