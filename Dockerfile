FROM node:15.0

WORKDIR /usr/src/app

ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm install
