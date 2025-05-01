FROM mysql:8.0

ENV MYSQL_DATABASE=food_diary_db
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=supersecret

COPY app/database/db_init/*.sql /docker-entrypoint-initdb.d/
