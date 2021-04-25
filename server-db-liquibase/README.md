# server-db-liquibase

- server-db-liquibase - DataBase migration with Liquibase (run: `docker-compose up -d` to start PostgreSQL)

### Two main commands to update database:

- update DB: `yarn db-update`
- rollbackCount DB: `yarn db-rollbackCount <number of latest changeSets to rollback>`
