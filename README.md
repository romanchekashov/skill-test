# Skill test

## improve your knowledge with Active Recall and Spaced Repetition

Mono-repo created with yarn workspaces and consist two packages:

- client - Web client with SSR on NextJS, TypeScript, React, Redux-Toolkit, PrimeReact
- sever - Backend created with TypeScript on ExpressJs with Sequelize ORM
- data - contains common dtos for server and client
- server-db-liquibase - DataBase migration with Liquibase (run: `docker-compose up -d` to start PostgreSQL)

### Development:

Start Docker: `docker-compose up -d`
Stop Docker: `docker-compose down`

### server-db-liquibase - DataBase migration with Liquibase (run: `docker-compose up -d` to start PostgreSQL)

- update DB: `yarn db-update`
- rollbackCount DB: `yarn db-rollbackCount <number of latest changeSets to rollback>`
