# Stockfish Server Docker Image

[![img-docker]][link-docker]
[![img-github-actions]][link-github-actions]

Server/Cloud-ready Stockfish Docker Image based on [slim Node Debian][link-docker-node] image including:

- [Stockfish Engine][link-stockfish]
- A simple [Node.js script](https://github.com/ivangabriele/docker-stockfish/blob/main/server/index.mjs)
  to communicate with Stockfish Engine via UCI commands through WebSockets

This image is intented for people who want to setup their own Stockfish Server using own server or cloud instance.

[Docker Hub prebuilt images][link-docker] are automatically updated on a daily basis.

You have to communicate with this server via WebSockets.  
You can send 2 event types: `auth:authenticate` and `uci:command`.  
You can receive 3 event types: `auth:authenticated`, `auth:unauthenticated` and `uci:response`.  
All sent and received events look like that: `{ type: string }` or `{ type: string, payload: string }`.

[Check the client example][link-example] to understand how that works.

---

- [Example](#example)
- [Supported tags and respective `Dockerfile` links](#supported-tags-and-respective-dockerfile-links)
- [Docker Environment Variables](#docker-environment-variables)
  - [`API_TOKEN`](#api_token)
  - [`PORT`](#port)
- [Docker Arguments](#docker-arguments)
  - [`ARCH`](#arch)
- [Sanity Check](#sanity-check)
- [Contribute](#contribute)
  - [Prerequisites](#prerequisites)
  - [Build](#build)
  - [Run](#run)

---

## Example

You can check a very simple implementation example in [examples/simple][link-example] using this Docker image.
You'll find a `README.md` there explaining how to it works and how to run it locally.

## Supported tags and respective `Dockerfile` links

- [`15`](https://github.com/ivangabriele/docker-stockfish/blob/main/dockerfiles/15.Dockerfile)

## Docker Environment Variables

### `API_TOKEN`

If you set the `API_TOKEN`, sent socket events will need to be authenticated using this token.
Otherwise anybody can listen and emit to your server.

Undefined by default.

### `PORT`

**REQUIRED**

This is the server exposed port to emit and listen socket events.

## Docker Arguments

**⚠️ The arguments can ONLY be used if you build your image DIRECTLY from the
[`./dockerfiles` directory](https://github.com/ivangabriele/docker-stockfish/tree/main/dockerfiles)**
and not via the Docker Hub images that are prebuilt using the default values declared below.

### `ARCH`

Architecture target while building:

**Default value:** `x86-64-bmi2`

- `apple-silicon`: Apple silicon ARM64
- `armv7-neon`: ARMv7 32-bit with popcnt and neon
- `armv7`: ARMv7 32-bit
- `armv8`: ARMv8 64-bit with popcnt and neon
- `e2k`: Elbrus 2000
- `general-32`: unspecified 32-bit
- `general-64`: unspecified 64-bit
- `ppc-32`: PPC 32-bit
- `ppc-64`: PPC 64-bit
- `riscv64`: RISC-V 64-bit
- `x86-32-sse2`: x86 32-bit with sse2 support
- `x86-32-sse41-popcnt`: x86 32-bit with sse41 and popcnt support
- `x86-32`: x86 32-bit generic (with mmx and sse support)
- `x86-64-avx2`: x86 64-bit with avx2 support
- `x86-64-avx512`: x86 64-bit with avx512 support
- `x86-64-avxvnni`: x86 64-bit with avxvnni support
- `x86-64-bmi2`: x86 64-bit with bmi2 support
- `x86-64-modern`: common modern CPU, currently x86-64-sse41-popcnt
- `x86-64-sse3-popcnt`: x86 64-bit with sse3 and popcnt support
- `x86-64-sse41-popcnt`: x86 64-bit with sse41 and popcnt support
- `x86-64-ssse3`: x86 64-bit with ssse3 support
- `x86-64-vnni256`: x86 64-bit with vnni support 256bit wide
- `x86-64-vnni512`: x86 64-bit with vnni support 512bit wide
- `x86-64`: x86 64-bit generic (with sse2 support)

## Sanity Check

Once you have deployed your Stockfish Server either locally or remotely, you can check if the server is running by
visiting the `/check` path.

You should normally see a plain text body stating: "Stockfish Server is up and running."

## Contribute

`X` is the OS name + version (one of `debian-bookworm`, `debian-bullseye`, `fedora-37`).  
<!-- `y` is the architceture tag (`x86-64-avx2`).   -->

### Prerequisites

- Docker ([Desktop](https://docs.docker.com/desktop/) or [Engine](https://docs.docker.com/engine/install/))
- Make (installation depends on your OS)

### Build

```sh
make build-X
```

Example: `make build-15`.

### Run

```sh
make run-X
```

Example: `make run-15`.

---

[img-docker]: https://img.shields.io/docker/pulls/ivangabriele/stockfish?style=for-the-badge
[img-github-actions]:
  https://img.shields.io/github/actions/workflow/status/ivangabriele/docker-stockfish/main.yml?branch=main&label=Build&style=for-the-badge

[link-docker-node]: https://hub.docker.com/_/node
[link-docker]: https://hub.docker.com/repository/docker/ivangabriele/stockfish
[link-example]: https://github.com/ivangabriele/docker-stockfish/tree/main/example/simple
[link-github-actions]: https://github.com/ivangabriele/docker-stockfish/actions/workflows/main.yml?query=branch%3Amain
[link-stockfish]: https://github.com/official-stockfish/Stockfish#readme
