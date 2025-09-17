.PHONY: install-pnpm install build dev start

install-pnpm:
	npm i -g pnpm

install:
	pnpm i & \
	cd ./backend && npm i & \
	wait

build:
	pnpm build & \
	cd ./backend && npm run build & \
	wait

dev:
	cd ./backend && npm run start & \
	pnpm dev & \
	wait

start: install build dev