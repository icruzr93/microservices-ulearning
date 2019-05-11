# Commands

# Microservices with Docker, Flask, and React

[![Build Status](https://travis-ci.org/icruzr93/microservices-ulearning.svg?branch=master)](https://travis-ci.org/icruzr93/microservices-ulearning)

```sh
docker-compose -f docker-compose.yml up -d --build
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py recreate_db
```

```sh
docker-compose exec users flake8 project
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py seed_db
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py test
```

```sh
docker-compose -f docker-compose.yml exec users-db psql -U postgres
```
