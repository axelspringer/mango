FROM node:latest

# Label
LABEL MAINTAINER sebastian.doell@spring-media.de

# Arguments
ARG TEMPLETON_VERSION
ARG GIBSON_VERSION
ARG MANGO_VERSION

# Env
ENV TEMPLETON_VERSION ${TEMPLETON_VERSION:-0.0.13}
ENV GIBSON_VERSION ${GIBSION_VERSION:-0.0.5}
ENV MANGO_VERSION ${MANGO_VERSION:-1.0.0-aplha.53}

# create app directory
WORKDIR /usr/src/app

# install global
RUN npm install -g \
  @axelspringer/mango-api@${MANGO_VERSION} \
  @axelspringer/mango-plugin-pagemanager@${MANGO_VERSION} \
  @axelspringer/mango-plugin-navigation@${MANGO_VERSION} \
  graphql@0.13.2 \
  graphql-iso-date

# Adding Templeton (https://githubcom/axelspringer/templeton)
ADD https://github.com/axelspringer/templeton/releases/download/${TEMPLETON_VERSION}/templeton_linux_amd64 /bin/templeton

# Adding Gibson (https://githubcom/axelspringer/gibson)
ADD https://github.com/axelspringer/gibson/releases/download/${GIBSON_VERSION}/gibson_linux_amd64 /bin/gibson

# Chmod
RUN chmod +x /bin/templeton /bin/gibson

# run on 8080
EXPOSE 8080
CMD [ "/bin/templeton", "run", "--force", "mango-api" ]
