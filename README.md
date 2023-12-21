# NxStarter - NNN (Next, Nest, NX)


Stack:
 - Next
 - Nest
 - Prisma


Key features:
 - GH actions with linting, building and auto deploy to AWS
 - Docker compose with postgres and pgAdmin for dev
 - TS-rest for end-to-end type-safety and auto generated swagger
 - shared package for reusable code between packages
 - pre-configured tailwind


Package manager:
 - pnpm


Prerequisites:
 - NodeJS 18+
 - pnpm 8+
 - docker with docker compose


First start:
 1. Run `pnpm i` to install dependencies
 2. Prepare env files. I created .env.example with default envs
 3. Run `docker compose up`. If you have your db, than you can skip it, but then do not forget to change `DATABASE_URL` in `packages/db` env
 4. Run `pnpm nx serve api` to start api
 5. Run `pnpm nx serve web` to start web
