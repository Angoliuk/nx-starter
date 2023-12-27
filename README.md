# NxStarter - NNN (Next, Nest, NX)


Stack:
 - Next
 - Nest
 - Prisma


Key features:
 - *GH actions* with linting, building and auto deploy to AWS
 - *Docker compose* with postgres and pgAdmin for dev
 - TS-Rest for *end-to-end type-safety* and auto generated swagger
 - *Shared package* for reusable code between packages
 - Pre-configured *tailwind*
 - Next with *Server Components*
 - No JS only TS

Prerequisites:
 - NodeJS 18+
 - Pnpm 8+
 - Docker with docker compose


First start:
 1. Run `pnpm i` to install dependencies
 2. Prepare env files. I created .env.example with default envs
 3. Run `docker compose up`. If you have your db, than you can skip it, but then do not forget to change `DATABASE_URL` in `packages/db` env
 4. Run `pnpm nx serve api` to start api
 5. Run `pnpm nx serve web` to start web

 Initial content:
  - Added base Nest module for auth/user
  - Configured user Prisma schema
  - Added example page


TODO:
 - Envalid for db package
 - Backend logger

 Blocked features:
 1. Aliases inside apps<br>
  Reasons:
    - After extending tsconfigs paths do not combine, so if I will add aliases, then root aliases will be removed
 2. Better libs aliases<br>
  Reasons:
    - comment here ./tsconfig.base.json, line 40
 3. Swagger with auth protections routes<br>
  Reasons:
    - TSRest autogenerated swagger do not support this feature for now
