# typescript-api-boilerplate

This is an opinionated boilerplate for an api project.

Here's the checklist for features I need:

- Decent database interactions. By [zapatos](https://jawj.github.io/zapatos/)
- A decent way of typing routes. By [routing-controllers](https://github.com/typestack/routing-controllers)
- Schema generation so that frontends can parse it for types. By [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi)
- Decent migrations. By [marv](https://github.com/guidesmiths/marv)
- Decent logging. By [winston](https://github.com/winstonjs/winston)
- IoC for ease of testing. By [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc)
- Testing. By [jest](https://jestjs.io/), [supertest](https://github.com/visionmedia/supertest) and [a lot of tweaks for zapatos](./tests/setup.ts)
- Dockerized for development

## Comments on choices and whatnot

### Migrations

First of all, since we have full control from the beginning for the stack, might as well choose postgres. This will allow us to use zapatos, which is an excellent library for making typescript work with postgres.

I have written quite a bit of migration scripts using django before. Really, there's nothing quite a bit like it when it comes to an ORM. Its maturity really shines when you compare to Node libraries that aim to provide the same features. And the truth is, once you start to need anything remotely as complex as having to move some data around, just about everything falls short.

And so, I've taken a step back on deciding what tools I should use (just like zapatos did). The fact that using postgres is fixed and non negotiable for this boilerplate makes some stuff so much easier. Maybe we should just write plain old SQL for migrations and actually understand what's going on with our queries and migrations. Maybe that's just better than using some over-abstracted library that aims to be universal for databases that we're never going to use.

That's why I think writing raw sql migrations is better.

I said before that I've written a lot of migrations, and in the effort of making them consistent, I've written **a lot** of backwards migrations, some of which included many members of the team and some of which took quite a bit of time to write.

Despite all that, I have **never ever** issued a rollback in any migration. That's why I'm ditching the feature completely.

### Zapatos vs ORMs and postgres

In my life as a software engineer I've used the big 4. MySQL, Oracle, MSSQL and Postgres. Let's not discuss about Oracle because, well, money. The other 3 are fine, so why choose postgres over MSSQL or MySQL?

Might very well be a preferences thing, but I have ran into some issues with the ones I didn't choose, namely:

- I hate MSSQL because it's so hard to use with Linux.
- I've found more missing stuff in MySQL that postgres support than the other way around. An example is support for full outer joins.

Having chosen postgres, I think it's better to dedicate all of our time to use it at its full potential rather than support silly database management software migrations (like anyone has ever done that).

That is why zapatos is such a good library.

It's like, just use postgres with type safety and be done with it. Don't use badly or over abstracted libraries.
