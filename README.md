# Skill test

## improve your knowledge with Active Recall and Spaced Repetition

Mono-repo created with yarn workspaces and consist two packages:

- web - Web client based on Create React App with TypeScript, React, Redux-Saga, PrimeReact
- sever - Backend created with TypeScript on ExpressJs with Sequelize ORM
- server-db-liquibase - DataBase migration with Liquibase (run: `docker-compose up -d` to start PostgreSQL)
- data - contains common dtos for server and web
- client - Web client with SSR on NextJS, TypeScript, React, Redux-Saga, PrimeReact

### Development:

Start Docker: `docker-compose up -d`
Stop Docker: `docker-compose down`
