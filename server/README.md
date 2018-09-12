# Nestjs + Graphql + Prisma

## Quick start
<p>GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It is an elegant approach that solves many of these problems that we have with typical REST apis. There is a great comparison between GraphQL and REST. </p>

<p>The GraphQLModule is nothing more than a wrapper around the Apollo server. We don't reinvent the wheel but provide a ready to use module instead, that brings a clean way to play with the GraphQL and Nest together.</p>

## Steps
1. npm install -g @nestjs/cli
2. npm install
3. docker-compose up -d

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:5000/graphql`. The app will automatically reload if you change any of the source files.

## Production server

Run `npm run start` for a prod server. Navigate to `http://localhost:4000/graphql`. 

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Environments files

.env
.env.dev

# ORM-like layer Prisma

**Prisma is a performant open-source GraphQL [ORM-like layer](#is-prisma-an-orm)** doing the heavy lifting in your GraphQL server. It turns your database into a GraphQL API which can be consumed by your resolvers via [GraphQL bindings](https://oss.prisma.io/content/graphql-binding/01-overview).

Prisma's auto-generated GraphQL API provides powerful abstractions and modular building blocks to develop flexible and scalable GraphQL backends:

- **Type-safe API** including filters, aggregations, pagination and transactions.
- **Data modeling & migrations** with declarative GraphQL SDL.
- **Realtime API** using GraphQL subscriptions.
- **Advanced API composition** using GraphQL bindings and schema stitching.
- **Works with all frontend frameworks** like React, Vue.js, Angular.


## GraphQL API

The most important component in Prisma is the GraphQL API:

* Query, mutate & stream data via a auto-generated GraphQL CRUD API
* Define your data model and perform migrations using GraphQL SDL

Prisma's auto-generated GraphQL APIs are fully compatible with the [OpenCRUD](https://www.opencrud.org/) standard.

#### 1. Install the CLI via NPM

```bash
npm install -g prisma
```

#### 2. Create a new Prisma service

Run the following command to create the files you need for a new Prisma [service](https://www.prisma.io/docs/reference/service-configuration/overview-ieshoo5ohm).

```bash
prisma init hello-world
```

Then select the **Demo server** (hosted in Prisma Cloud) and follow the instructions of the interactive CLI prompt.

<details><summary><b>Alternative: Setup Prisma with your own database.</b></summary>
<p>

Instead of using a Demo server, you can also setup a Prisma server that is connected to your own database. Note that this **requires [Docker](https://www.docker.com)**.

To do so, run `prisma init` as shown above and follow the interactive CLI prompts to choose your own database setup:

- Create a new database
- Connect an existing database

Once the command has finished, you need to run `docker-compose up -d` to start the Prisma server.

</p>
</details>

#### 3. Define your data model

Edit `datamodel.graphql` to define your data model using GraphQL SDL:

```graphql
type Tweet {
  id: ID! @unique
  createdAt: DateTime!
  text: String!
  owner: User!
}

type User {
  id: ID! @unique
  handle: String! @unique
  name: String!
  tweets: [Tweet!]!
}
```

#### 4. Deploy your Prisma service

To deploy your service, run the following command:

```bash
prisma deploy
```

#### 5. Explore the API in a Playground

Run the following command to open a [GraphQL Playground](https://github.com/prismagraphql/graphql-playground/releases) and start sending queries and mutations:

```bash
prisma playground
```

<details><summary><b>I don't know what queries and mutations I can send.</b></summary></details>

**Create a new user**:

```graphql
mutation {
  createUser(
    data: {
      name: "Alice"
      handle: "alice"
    }
  ) {
    id
  }
}
```

**Query all users and their tweets**:

```graphql
query {
  users {
    id
    name
    tweets {
      id
      createdAt
      text
    }
  }
}
```

**Create a new tweet for a user**:

> Replace the `__USER_ID__` placeholder with the `id` of an actual `User`

```graphql
mutation {
  createTweet(
    data: {
      text: "Prisma makes building GraphQL servers fun & easy"
      owner: {
        connect: {
          id: "__USER_ID__"
        }
      }
    }
  ) {
    id
    createdAt
    owner {
      name
    }
  }
}
```
#### 6. Next steps

You can now connect to Prisma's GraphQL API, select what you would like to do next:
