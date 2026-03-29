# REST API server written in Python on Flask

## How to start

tbd


## Dependencies

### Install virtual environment

Make sure you have venv install (.venv folder)

### Check installed dependencies

```shell
pip freeze
```

or put them directly into a file (will override existing one)

```shell
pip freeze > requirements.txt
```

### Install dependencies locally

```shell
pip install -r requirements.txt

```

## Docker

### Build docker image

```shell
docker build -t e-commerce-flask .
```

### Run docker container

```shell
docker run -d -p 5050:5000 e-commerce-flask
```

### Run container with local files mounted

```shell
docker run -d -p 5050:5000 -v "$(pwd):/app" e-commerce-flask
```
