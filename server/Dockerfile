FROM node:16.14 AS development
WORKDIR /opt/serverdev
ENV HOST=0.0.0.0
ENV PORT=4000
ENV NODE_ENV=development
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 9229
EXPOSE 4000
CMD [ "yarn", "run" , "dev"]