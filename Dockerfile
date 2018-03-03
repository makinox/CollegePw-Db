FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
MAINTAINER Jesus Bossa <jesusbossa@protonmail.com>
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3001
CMD npm start