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
docker build -t e-commerce-flask-app .
```

### Run docker container

```shell
docker run -d -p 5001:5000 e-commerce-flask
```
