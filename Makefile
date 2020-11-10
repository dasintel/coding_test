.PHONY: build run

IMAGE_NAME = "das_coding_test:latest"

build:
	docker build --tag ${IMAGE_NAME} .

test:
	docker run --volume ${CURDIR}/src:/usr/src/app/src --tty ${IMAGE_NAME} npm test
