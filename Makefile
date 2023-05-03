_NAME = "ivangabriele_dockfish"

build:
	docker build -f "./dockerfiles/$(_VERSION).Dockerfile" -t "ivangabriele/dockfish:$(_VERSION)" .
build-15:
	_VERSION="15" make build

run: --stop-and-remove
	make build
	docker run -dt --name "$(_NAME)" "ivangabriele/dockfish:$(_VERSION)"
run-15:
	_VERSION="15" make run

--stop-and-remove:
	docker stop "$(_NAME)" || true 2>/dev/null
	docker rm "$(_NAME)" || true 2>/dev/null

################################################################################
# DEBUG COMMANDS

rebuild:
	docker system prune -af --volumes
	docker build -f "./dockerfiles/$(_VERSION).Dockerfile" --no-cache -t "ivangabriele/dockfish:$(_VERSION)" .
rebuild-15:
	_VERSION="15" make rebuild

sh: build
	docker run -it ivangabriele/dockfish:$(_VERSION) /bin/sh
sh-15:
	_VERSION="15" make sh

shf: rebuild
	docker run -it ivangabriele/dockfish:$(_VERSION) /bin/sh
shf-15:
	_VERSION="15" make shf
