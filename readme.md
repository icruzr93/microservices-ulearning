# Microservices with Docker, Flask, and React

[![Build Status](https://travis-ci.com/icruzr93/microservices-ulearning.svg?token=yymzpcbz5E6PUXJj9jfT&branch=master)](https://travis-ci.com/icruzr93/microservices-ulearning)

# Environment Variables

## Development
export REACT_APP_USERS_SERVICE_URL=http://localhost

## Staging
export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_STAGING_IP

## Production
$ export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_PROD_IP
$ export SECRET_KEY=SOMETHING_SUPER_SECRET

# Build and Run Images

$ docker-compose build
$ docker-compose up -d

$ docker-compose exec users python manage.py recreate_db
$ docker-compose exec users python manage.py seed_db

$ docker-compose exec users python manage.py test
$ docker-compose exec users flake8 project
$ docker-compose exec client npm test -- --verbose
$ ./node_modules/.bin/cypress open --config baseUrl=http://localhost

# Stop Containers

$ docker-compose stop
$ docker-compose down
$ docker rmi $(docker images -q)
$ docker-compose logs -f

# Test Script

```sh
sh test.sh server
sh test.sh client
sh test.sh e2e
```

### Database Commands

```sh
docker-compose exec users-db psql -U postgres
docker-compose exec users python manage.py db migrate
docker-compose exec users python manage.py db upgrade
```

```sh
# \c users_dev
# \d+ users
# \dt
```
