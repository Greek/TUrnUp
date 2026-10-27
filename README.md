# TUrnUp

TUrnUp is a progressive web app that consolidates events from [Events at Towson][events]
and [Involved@TU][involved] into one reliable source, allowing students to get up-to-date
information on the events around Towson University.

TUrnUp can be accessed *right now* at <https://turnup.ndy.sh>.

## How to Run Locally

The app requires a Redis URL and a running scheduler service. Copy `.env.example` to `.env`
and set `REDIS_URL`, `SCHEDULER_GRPC_ADDRESS`, and `SCHEDULER_AUTH_TOKEN`.

1. Clone the repository
```bash
$ git clone https://github.com/Greek/tu-maker-fest-events-app
```
2. Run `pnpm install`
3. Run `pnpm build`
4. Finally, start the application `pnpm start`

## How it Works

TUrnUp is a Next.JS app based off the [Create T3 App stack](https://create.t3.gg/) that pulls data 
from the [Involved@TU][involved] API and the [Events at Towson][events] API. 

These APIs are powered by [Anthology's Campus Engage][involved-api-docs] (Involved@TU) 
and [Localist][events-api-docs] (Events at Towson)

## Updating the Scheduler gRPC Client

With `protoc` installed and the scheduler submodule checked out, run `pnpm proto:generate` to
regenerate the TypeScript gRPC client from `scheduler.proto`.

## Credits

Andreas P. ([@Greek](https://github.com/Greek)) (Backend), Luis G. ([@curlyLasagna](https://github.com/curlyLasagna)) (Frontend),
Kenneth E. ([@cdetk](https://github.com/cdetk)) (Frontend, Design)

[involved]: https://involved.towson.edu
[events]: https://events.towson.edu
[involved-api-docs]: https://involved.towson.edu/engage/api/docs/#introduction
[events-api-docs]: https://developer.localist.com/doc/api
