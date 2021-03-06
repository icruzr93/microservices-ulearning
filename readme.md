# Microservices with Docker, Flask, and React


[![CircleCI](https://circleci.com/gh/icruzr93/microservices-ulearning.svg?style=svg)](https://circleci.com/gh/icruzr93/microservices-ulearning)

# Environment Variables

# Build and Run Images

```sh
$ docker-compose build
$ docker-compose up -d
```

```sh
$ docker-compose exec users python manage.py recreate_db
$ docker-compose exec users python manage.py seed_db
```

```sh
$ docker-compose exec users python manage.py test
$ docker-compose exec users flake8 project
$ docker-compose exec client npm test -- --verbose
$ ./node_modules/.bin/cypress open --config baseUrl=http://localhost
```

# Stop Containers
```sh
$ docker-compose stop
$ docker-compose down
$ docker rmi $(docker images -q)
$ docker-compose logs -f
```
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
