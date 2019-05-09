# Commands

```sh
docker-compose -f docker-compose.yml up -d --build
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py recreate_db
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py seed_db
```

```sh
docker-compose -f docker-compose.yml exec users python manage.py test
```

```sh
docker-compose -f docker-compose.yml exec users-db psql -U postgres

# \c users_dev
# select * from users;
```
