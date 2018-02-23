FROM node:carbon

# create app directory
WORKDIR /usr/src/app

# support (npm@5+)
COPY package*.json ./

# install
RUN npm install --only production \
  && npm i graphql \
  && npm i graphql-iso-date

# assets
COPY . .

# run on 8080
EXPOSE 8080
ENTRYPOINT [ "./bin/mango-api" ]
