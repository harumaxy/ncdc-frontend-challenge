.PHONY: install-pnpm install build dev start install-test-deps test test-debug

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

install-test-deps:
	cd ./frontend && pnpm playwright install

test:
	git checkout backend/data/dev.sqlite && \
	cd ./backend && npm run start & \
	pnpm test & \
	wait

test-debug:
	git checkout backend/data/dev.sqlite && \
	cd ./backend && npm run start & \
	pnpm test --debug & \
	wait