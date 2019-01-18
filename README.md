# BrandsAPI

A personal sandbox with the objective of testing new technologies.

## Database

Before running the server, you need a PostgreSQL server with a database created using the script included in the folder *db*. In order to connect to the DB from the service, you need to specify the necessary environment variables, like this:

```bash
$ PGUSER=dbuser \
  PGHOST=database.server.com \
  PGPASSWORD=secretpassword \
  PGDATABASE=mydb \
  PGPORT=3211 \
  yarn start
```

## Running dev server

```bash
yarn install
yarn start
```

## Viewing the API docs

Go to http://localhost:3000/api-docs

## Current features

- TypeScript
- API definition with OpenAPI
- Basic DB in PostgreSQL
- Repository pattern for data retrieval
- Parameters sanitization
- REST API based on Express
- Error management middleware

## Future features

- Authentication and ACL using OAuth
- Admin UI based on React Admin