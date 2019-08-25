# SMS Management API



An simple application for managing small message services

# Description

**** is a backend application built with node and sequelize ORM

# Table of Contents

- [Documentation](#documentation)
- [Setup](#setup)
  - [Database and ORM](#database-and-orm)
- [Testing](#testing)
- [License](#license)

## Documentation

The end points for this app are documented on swagger 
Run this url `localhost:3000/docs/api/#/` on your browser after you set-up and start the app 
* Add `BASE_URL=localhost:3000` to your .env file when running the swagger documentation

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [PostgreSQL](https://github.com/postgres/postgres) - A relational database management system that extends SQL
- [Sequelize](https://github.com/sequelize/sequelize) - A promise-based ORM for NodeJS


### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Install and setup [PostgreSQL](https://www.postgresql.org/)
- Clone the repository by running the command
  ```
  git clone https://github.com/hope-uwa/SMS-Management-API.git
  ```
- Run `cd SMS-Management-API` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  yarn install
  ```
- Create a `.env` file in the root of your directory using the `.env.example` file in the repository
- Setup the database and migrations (**_see [database setup](#database-and-orm, 'setting up database')_**)
- Start the application by running
  ```
  yarn run start:dev
  ```
  The application should now be running at `http://127.0.0.1:3000`

#### Database and ORM

- Create a database in `PostgreSQL` and name it `travel_tool`
- Set the following environment variables in `.env`:

  - `DATABASE_URL` - ostgres://{username}:@localhost:{port}/{database name}
 

- Run database migrations
  ```
  yarn run db:migrate
  ```
- Check the database and confirm that the `users` table has been created

### More about environmental variables

After setting up your `.env` from the template provided in the `.env.example` file,
to use these variables anywhere in the app;

- import the `dotenv` package

```
import dotenv from 'dotenv'
```

- Make it available for use as early as possible in that file

```
dotenv.config()
```

- Access any variable in the `.env`

```
process.env.MY_ENV_VARIABLE
```

## License

This application is licensed under the terms of the [MIT License](https://github.com/andela/travel_tool_back/blob/develop/LICENSE)
