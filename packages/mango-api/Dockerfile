FROM node:latest

# Label
LABEL MAINTAINER sebastian.doell@spring-media.de

# Arguments
ARG TEMPLETON_VERSION

# Env
ENV TEMPLETON_VERSION ${TEMPLETON_VERSION:-0.0.10}

# create app directory
WORKDIR /usr/src/app

# support (npm@5+)
COPY package*.json ./

# install
RUN npm install --only production \
  && npm i graphql \
  && npm i graphql-iso-date

# assets
COPY scripts/start.sh /start.sh
COPY dist dist/
COPY bin bin/

# Adding Templeton (https://githubcom/axelspringer/templeton)
ADD https://github.com/axelspringer/templeton/releases/download/${TEMPLETON_VERSION}/templeton_linux_amd64 /bin/templeton

# Chmod
RUN chmod +x /bin/templeton \
  && chmod +x /start.sh

# run on 8080
EXPOSE 8080
CMD [ "/bin/templeton", "run", "/start.sh"]
