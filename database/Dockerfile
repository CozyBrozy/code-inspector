FROM mysql:8.0

ENV MYSQL_DATABASE=food_diary_db
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY ./database/db_init /docker-entrypoint-initdb.d