FROM debian:bullseye-slim

ARG ARCH=x86-64-bmi2

ENV API_TOKEN=
ENV DOMAIN=
ENV PORT=

# Install OS dependencies
RUN apt-get update
RUN apt-get install -y \
  build-essential \
  make \
  net-tools \
  python3 \
  python3-pip \
  wget

# Download Stockfish
WORKDIR /tmp
RUN wget https://github.com/official-stockfish/Stockfish/archive/refs/tags/sf_15.1.tar.gz
RUN tar -xf ./sf_15.1.tar.gz
RUN rm -f ./sf_15.1.tar.gz

# Install Stockfish
WORKDIR /tmp/Stockfish-sf_15.1/src
RUN make net
RUN make build ARCH=${ARCH}
RUN make install

# Setup server
RUN pip3 install aiohttp python-chess socketio
WORKDIR /app
COPY ./server/server.py /app/server.py
EXPOSE $PORT

ENTRYPOINT ["python3", "server.py"]
