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
docker run -d -p 5050:80 e-commerce-flask
```

### Run container with local files mounted

```shell
docker run -d -p 5050:80 -v "$(pwd):/app" e-commerce-flask
```

---

## Notes

### If node is not found on your machine this might help

```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] \ 
  && printf %s "${HOME}/.nvm" \ 
  || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] \
  && \. "$NVM_DIR/nvm.sh" --no-use # This loads nvm, without auto-using the default version
```