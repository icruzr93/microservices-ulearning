# Commands

```sh
docker-compose -f docker-compose-prod.yml up -d --build
```

```sh
docker-compose -f docker-compose-prod.yml exec users python manage.py recreate_db
```

```sh
docker-compose -f docker-compose-prod.yml exec users python manage.py seed_db
```

```sh
docker-compose -f docker-compose-prod.yml exec users python manage.py test
```
