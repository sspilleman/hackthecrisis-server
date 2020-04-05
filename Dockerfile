FROM node:alpine
LABEL version="1.0"
WORKDIR /home/node/app
COPY package.json ./
RUN npm install
RUN chown -R node:node node_modules
RUN chown -R node:node /tmp
COPY --chown=node:node . .
USER node
CMD [ "npm", "start" ]
