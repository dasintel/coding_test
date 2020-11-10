#!/bin/bash

docker build --tag das_test:latest .
docker run --tty das_test:latest npm test
