# typescript-api-boilerplate

This is an opinionated boilerplate for an api project. It involves writing
mostly safe Typescript code, using a postgres database and have good integration
testing.

It's also dockerized and expected to be ran in a kubernetes cluster.

## Routing

Routing is powered by
[routing-controllers](https://github.com/typestack/routing-controllers) over
[Koa](https://koajs.com).

Conf:

- routing controllers in [app.ts](./src/app.ts)
- Koa in the same file but also in the entrypoint [index.ts](./src/index.ts)

## Dependency injection

Dependency injection is done by
[typescript-ioc](https://github.com/thiagobustamante/typescript-ioc). We inject
the pg pool with this tool into controllers.

You're encouraged to write services to handle operations between your database
layer (which is handled by zapatos) and your controller layer which is handled
by routing controllers. Controllers get way cleaner this way.

Zapatos is discussed next

## Database (PostgreSQL)

The database layer is handled by a few tools

- [Zapatos](https://jawj.github.io/zapatos/) handles postgres interaction along
  with [node-postgres](https://node-postgres.com). Can't get much cleaner than
  that
- [Marv](https://github.com/guidesmiths/marv) handles database migrations

First, migrations. You can write plain `.sql` migration files and leave them in
the `migrations` directory. You can read the documentation on how to use it.
Pretty simple.

There are two ways to apply migrations

```
$ yarn migrate       # for rootless docker access
$ yarn prod:migrate  # inside the web container
```

Lastly, for the database, zapatos requires us to parse the database schema to generate types. The same goes for these scripts:

```
$ yarn zg       # rootless docker: mnemonic is zapatos-generate
$ yarn zapatos  # inside the container
```

Any of those should get your schema into `./src/zapatos`.

Any time you wish to run queries with zapatos, you can either

```typescript
@InjectValue('db')
pool: Pool
```

Where `Pool` comes from `pg`, and:

```typescript
const pool: Pool = Container.getValue('db')
```

The first example you'd use it in a container or service class. Any class,
really. The second way you'd use it where you cannot inject it. In tests or in
bull queues, for example

## Logging

Logging is provided by [pino](https://github.com/pinojs/pino). There's a small utility in the [logger file](./src/logger.ts) where you can get a logger for anything. Use it like so:

```typescript
private logger = getLogger('my-logger-name')
```

## Testing

Tests are inside the `tests` directory. I try to follow a principle as much as I can:

> Write tests, not too many, mostly integration.

To make requests to the testing server, just go ahead and use
[axios](https://github.com/axios/axios). The base url is set to the server.

If you, for some reason, need to mock axios inside your tests, let me know and
let's solve it.

## Swagger UI and OpenAPI

You might want to use a codegen tool for your schema if your frontend is also
written in Typescript, and maybe you also want SwaggerUI to explore your api.

There's a default route in the [index controller](./src/controllers/index-controller.ts)
called `schema` where you can expose your app schema and parse it.

By default, Swagger UI is only available in development, you can check it out in
the [swagger ui conf file](./src/bootstrap/swagger-ui.ts).

You might also want to check out
[routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi)
in case you need to extend your schema.

## Compilation

Compilation is just `tsc`. I wanted as much reliability on the output as I
could. If you think something else is better, please let me know.

In development, nodemon is used to recompile on file changes.

## Settings

You'll notice there's two env packages. `dotenv` and `envalid`. Also, there's a
`.env` file. 

Here are the guidelines for sensitive variables:
- Never commit any of those values to any git repo
- Any `.env` file in the repo is used only for development
- `docker-compose` should be only used for development
- Build your image either yourself or in a pipeline
- Run your built image with the correct env variables. These should be specified
  in [this file](./src/conf/settings.ts)

I'll emphasize this as much as I can: **The .env file is not meant to be used in
production**. Instead, what this app does is read **everything** from
environment variables. That is also why `docker-compose` is only meant to be
used in development. I'll discuss more about docker in the next section.

So, in order to configure your app for development, it's fine to add env
variables to the `.env` file and `docker-compose.yml`, maybe even exposing them.

For production, what you want to do is run your image with appropriate env
variables, so that the container can pick them up.

## Docker

App is dockerized to avoid any surprises in production. There's a
`docker-compose` file to speed up development that currently includes a
database, but there could be more stuff there, like redis and mail servers.

We'll discuss deployment next

## Deployment

Firstly, if you need (for whatever reason) to deploy your application using
`docker-compose`, then **DO NOT** use the same `docker-compose.yml` file that's
included in this repo. Instead, make another one so you don't expose sensitive
data in your repo.

That said, the recommended way of deploying is the following

- Run a pipeline or github action or whatever CI tool you use to test your app
- Build an image off it and tag it
- Push that image to a container registry
- Use the image to build a container with the correct values for your
  environment variables.

Note that there's no supervisor process for the `yarn start` script. This is intentional because this app is meant to be deployed with Kubernetes.

However, you could easily change the production entrypoint to use something like
[pm2](https://pm2.keymetrics.io) if you're not using kubernetes.

## Roadmap

- [ ] Integrate koa sessions
- [ ] Rewrite error handler
- [ ] Add github actions to test that this template actually works
- [ ] Figure out if `yarn test --watchAll` works or not
- [ ] Check out alternatives because routing controllers is dropping Koa (#1)
- [ ] Write even better docs
- [ ] Possibly turn it into a framework instead of a boilerplate
- [ ] Maybe make a template out of this

## Questions or anything else

Please feel free to open an issue
