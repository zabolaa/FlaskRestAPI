# REST API server written in Python on Flask

## Project Overview

This project is a REST API for a simple e-commerce system built with Flask.  
It allows users to register, authenticate, and manage their own stores and products.

The API provides endpoints for:
- User registration and authentication (login)
- Creating and managing stores
- Adding, listing, and deleting products within stores

🔗 Live demo: https://flaskrestapi-ui.onrender.com/

---

## Features

- 🔐 User authentication (register & login)
- 🏪 Store management (create, view, delete)
- 📦 Product management (add, list, delete)
- 🧾 RESTful API design
- 🐳 Docker support for easy 

---

## How it works

1. A user registers an account
2. The user logs in and receives authentication credentials (e.g., token/session)
3. The authenticated user can:
   - Create a store
   - Add products to the store
   - View products
   - Delete products or stores

The API follows REST principles and communicates using JSON.

---

## Example API Flow

1. Register user
2. Login user
3. Create store
4. Add product to store
5. Retrieve product list
6. Delete product

---

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