FROM node:22-bullseye-slim

ARG ARCH=x86-64-bmi2

ENV API_TOKEN=
ENV PORT=

# Install OS dependencies
RUN apt-get update
RUN apt-get install -y \
  build-essential \
  make \
  net-tools \
  wget

# Download Stockfish
WORKDIR /tmp
RUN wget https://github.com/official-stockfish/Stockfish/archive/refs/tags/sf_15.1.tar.gz
RUN tar -xf ./sf_15.1.tar.gz

# Install Stockfish
WORKDIR /tmp/Stockfish-sf_15.1/src
RUN make net
RUN make build ARCH=${ARCH}
RUN make install
WORKDIR /
RUN rm -Rf /tmp

# Setup server
WORKDIR /app
COPY ./server/index.mjs /app/index.mjs
COPY ./server/package-lock.json /app/package-lock.json
COPY ./server/package.json /app/package.json
RUN npm ci

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
