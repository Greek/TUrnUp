# TUrnUp

TUrnUp is a progressive web app that consolidates events from [Events at Towson](events)
and [Involved@TU](involved) into one reliable source, allowing students to get up-to-date
information on the events around Towson University.

TUrnUp can be accessed *right now* at <https://turnup.ndy.sh>.

## How to Run Locally

TUrnUp is straightforward to get up and running, and it does not require any external API keys
or environment variables to work.

1. Clone the repository
```bash
$ git clone https://github.com/Greek/tu-maker-fest-events-app
```
2. Run `pnpm install`
3. Run `pnpm build`
4. Finally, start the application `pnpm start`

## How it Works

TUrnUp is a Next.JS app based off the [Create T3 App stack](https://create.t3.gg/) that pulls data 
from the [Involved@TU](involved) API and the [Events at Towson](events) API. 

These APIs are powered by [Anthology's Campus Engage](involved-api-docs) (Involved@TU) 
and [Localist](events-api-docs) (Events at Towson)

## Credits

Andreas P. ([@Greek](https://github.com/Greek)) (Backend), Luis G. ([@curlyLasagna](https://github.com/curlyLasagna)) (Frontend),
Kenneth E. ([@cdetk](https://github.com/cdetk)) (Frontend, Design)

[involved]: https://involved.towson.edu
[events]: https://events.towson.edu
[involved-api-docs]: https://involved.towson.edu/engage/api/docs/#introduction
[events-api-docs]: https://developer.localist.com/doc/api
