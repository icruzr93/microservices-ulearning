# Commands

# Microservices with Docker, Flask, and React

[![Build Status](https://travis-ci.com/icruzr93/microservices-ulearning.svg?token=yymzpcbz5E6PUXJj9jfT&branch=master)](https://travis-ci.com/icruzr93/microservices-ulearning)

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
docker-compose logs -f
```

### Coverage, Linting and Test

```sh
docker-compose exec users python manage.py cov
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py test
```

```sh
docker-compose -f docker-compose.yml exec users flake8 project
```

### Cypress Commands

```sh
./node_modules/.bin/cypress open --config baseUrl=http://localhost
```

### Database Commands

```sh
docker-compose exec users-db psql -U postgres
```

```sh
docker-compose exec users python manage.py db migrate
```

```sh
docker-compose exec users python manage.py db upgrade
```

```
# \c users_dev
# \d+ users
# \dt
```
