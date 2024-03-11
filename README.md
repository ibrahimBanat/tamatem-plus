## Reasoning
In this section i am going to talk about why i choosed some of the tech's that worked with in thus priject

1. `MYSQl`
    i choosed this database to be used along with prisma ORM because mysql is:
    - open-source and have good community
    - i've been working with this tech since 3years and ongoing
    - mysql is secure and reliable and can be scalable.
   
2. `PRISMA`
    prisma currently is the best ORM in the node js community and this is understandable because of:
    - Type-Safe Database Access.
    - Declarative Data Modeling
    - Query Builder
    - Automatic Migrations
    - Performance
    - Integration with GraphQL

3. `Fastify`
    i choosed fastify because it's node framework know for it's speed and simplicity. the main features of `Fastify`:
    - Performance: Fastify is one of the fastest web frameworks available for Node.js.
    - Schema-Based Validation: allows you to define the shape of incoming requests and automatically validate them against the defined schema.
    - Plugin Architecture: you can extend functionality of your project by creating plugins.


## Running Project
1. **Install Dependencies**

Navigate to the project directory and install the required dependencies using npm

````bash
cd <project-directory>
npm install
````

2. **Set Up Environment Variables**

Create a .env file in the root of 
your project directory and define your environment variables there, including database connection details 
and any other necessary configurations. (see .env.example)

3. **Run Prisma Migrations**

Apply the database migrations using Prisma CLI:

````bash
npx prisma migrate dev
````
4. **Generate Prisma Client**

5. **Seed the Database**

```bash
    npx prisma generate
```

Run the seeding script to populate your database with initial data. Execute the seeding script:

```bash
node prisma.seed.js
```

6.**Start the Fastify Server**

```bash
npm start
```
## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
To learn about Prisma check out the [Prisma documentation](https://www.prisma.io/docs)
