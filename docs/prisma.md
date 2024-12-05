# Prisma
Prisma is a next-generation ORM for Node.js and TypeScript that enables developers to work with databases in a type-safe and intuitive way. It supports SQL databases like PostgreSQL, MySQL, SQLite, and SQL Server, as well as NoSQL databases like MongoDB.

# Features:

1.Type-Safe Database Queries: Generate fully-typed queries for your database.

2.Database Agnostic: Works with various databases (SQL and NoSQL)

3.Query Optimization: Reduces the boilerplate needed for complex queries.

# Supported Database:
- **PostgreSQL** (Highly recommended for modern applications)
- **MySQL**
- **SQLite** (Great for small projects and prototyping)
- **Microsoft SQL Server**
- **CockroachDB** (Experimental support)


# Setup Guide

Step 1: Install Prisma CLI

 ```yarn add prisma --save-dev```

Step 2: Initialize Prisma

Prisma Folder is created containing prisma.schema file.

 ```yarn prisma init```

 Step 3: Configure the Database

 ``` DATABASE_URL="mysql://username:password@host/path" ```

Step 4: Define the Data Model

In prisma.schema file,

```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```
Step 6: Add Prisma Client

``` yarn add @prisma/client```


Step 7: Generate the Prisma Client

``` yarn prisma generate```

Step 8: Migrate the Database

Creates Migration File,

 ```yarn prisma migrate dev ```
