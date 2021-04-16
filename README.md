`fringe-workers`

A experimental project to execute GraphQL queries/mutations on Cloudflare Edge.

## 🔋 Getting Started

This template is meant to be used with [Wrangler](https://github.com/cloudflare/wrangler). If you are not already familiar with the tool, we recommend that you install the tool and configure it to work with your [Cloudflare account](https://dash.cloudflare.com). Documentation can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler/).

To generate using Wrangler, run this command:

```bash
wrangler generate my-ts-project https://github.com/bishwenduk029/fringe-workers
```

### ✏️ Concept

The purpose of project is to execute any kind of DB/GraphQL queries/mutations on Cloudflare's amazing and secure EDGE network.

File system based routing - Any .graphql file inside graphql folder, becomes accessible at REST endpoint `/graphql/*`

For example query residing at `/graphql/space/index.graphql` is mapped to `/graphql/space`(Method = POST)

### 👩 💻 Developing

1.) Inside graphql folder add your queries/mutations in plain .graphql
2.) Provide the URL for your GraphQL API in wrangler.toml
3.) Now open any REST client of your choice (say POSTMAN)
4.) Start accessing your REST endpoints via POST method.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).

### Roadmap

1.) Add support for normalized caching for GraphQL on Cloudflare KV ( in-progress )
2.) Add similar support for .sql files

## 🤢 Feedback

If you have any feedback or enhancement ideas please feel free to share them [here](https://github.com/bishwenduk029/fringe-workers/issues).
