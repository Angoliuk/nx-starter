# NxStarter - NNN (Next, Nest, NX)

Stack:

- Next
- Nest
- Prisma

Key features:

- _GH actions_ with linting, building and auto deploy to AWS
- _Docker compose_ with postgres and pgAdmin for dev
- TS-Rest for _end-to-end type-safety_ and auto generated _swagger_
- _Shared package_ for reusable code between packages
- Pre-configured _tailwind_
- Next with _Server Components_
- No JS only TS

Prerequisites:

- NodeJS 20+
- Pnpm 8+
- Docker with docker compose

First start:

1. Run `pnpm i` to install dependencies
2. Prepare env files. I created .env.example with default envs
3. Run `docker compose up` to start db
4. Run pnpm nx run api:serve to start api app
5. Run pnpm nx run web:serve to start web app

Blocked features:

1. Aliases inside apps<br>
    Reasons:
    - tsconfigs paths do not combine, so if I will add aliases, then root aliases will be removed
