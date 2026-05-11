# tarout-shop-api

Minimal e-commerce REST API — Express, no database (in-memory catalog). Pairs
with [tarout-shop-web](https://github.com/najialii/tarout-shop-web).

## Run locally

```bash
npm install
npm run dev      # auto-restarts on change (node --watch)
# or: npm start
```

Listens on `http://localhost:3000` by default (override with `PORT`).

## Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness probe |
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | One product |
| `POST` | `/api/orders` | Create an order — body: `{ "items": [{ "productId": "p1", "quantity": 2 }] }` |

Prices are integers in **cents**.

### Example

```bash
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/orders \
  -H 'content-type: application/json' \
  -d '{"items":[{"productId":"p1","quantity":1},{"productId":"p3","quantity":2}]}'
```

## Environment

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Listen port (platforms usually inject this) |
| `ALLOWED_ORIGIN` | `*` | CORS origin — set to your deployed frontend URL in production |

See `.env.example`.

## Deploy

Any Node host works. There's also a `Dockerfile` for container platforms.
On Tarout: create an app from this repo, framework auto-detects as Express,
start command `npm start`. Set `ALLOWED_ORIGIN` to your frontend's URL.
