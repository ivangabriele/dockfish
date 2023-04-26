# Stockfish Docker Image

[![img-docker]][link-docker]
[![img-github-actions]][link-github-actions]

Server/Cloud-ready Stockfish Docker Image based on slim [Debian][link-debian] images including:

- [Stockfish][link-stockfish]
- A simple Python script to communicate

This image is intented for people who want to easily setup Stockfish using their own server or cloud instance.

[Docker Hub prebuilt images][link-docker] are automatically updated on a daily basis.

---

- [Supported tags and respective `Dockerfile` links](#supported-tags-and-respective-dockerfile-links)
- [Environment Variables](#environment-variables)
  - [`API_TOKEN`](#api_token)
  - [`DOMAIN`](#domain)
  - [`PORT`](#port)
- [Arguments](#arguments)
  - [`ARCH`](#arch)
- [Contribute](#contribute)
  - [Prerequisites](#prerequisites)
  - [Build](#build)
  - [Run](#run)

---

## Supported tags and respective `Dockerfile` links

- [`15`](https://github.com/ivangabriele/docker-stockfish/blob/main/dockerfiles/15.Dockerfile)

## Environment Variables

### `API_TOKEN`

If you set the `API_TOKEN`, sent socket events will need to be authenticated using this token.
Otherwise anybody can listen and emit to your server.

Undefined by default.

### `DOMAIN`

If you set the `DOMAIN`, CORS will only be allowed for this domain (i.e.: `example.org`).

Default to `"*"`.

### `PORT`

This is the server exposed port to emit and listen socket events.

Default to `4000`.

## Arguments

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


## Contribute

`X` is the OS name + version (one of `debian-bookworm`, `debian-bullseye`, `fedora-37`).  
<!-- `y` is the architceture tag (`x86-64-avx2`).   -->

### Prerequisites

- Docker ([Desktop](https://docs.docker.com/desktop/) or [Engine](https://docs.docker.com/engine/install/))

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

[link-debian]: https://hub.docker.com/_/debian
[link-docker]: https://hub.docker.com/repository/docker/ivangabriele/stockfish
[link-github-actions]: https://github.com/ivangabriele/docker-stockfish/actions/workflows/main.yml?query=branch%3Amain
[link-stockfish]: https://github.com/official-stockfish/Stockfish#readme
