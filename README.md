# TanStack Start Vite+ Template

Simple starter for [TanStack Start](https://tanstack.com/start) apps, deployed to Cloudflare Workers.

## Stack

| Area      | Tool                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------- |
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)      |
| Toolchain | [Vite+](https://viteplus.dev) (`vp`) - dev, build, lint, format, test                              |
| UI        | [shadcn/ui](https://ui.shadcn.com) on [React Aria](https://react-aria.adobe.com) + Tailwind CSS v4 |
| Theming   | [`@wrksz/themes`](https://themes.wrksz.dev) - light / dark / system via `[data-theme]`             |
| Env vars  | Vite `import.meta.env` (client) + Cloudflare Worker `env` (server)                                 |
| Deploy    | Cloudflare Workers (`@cloudflare/vite-plugin` + Wrangler)                                          |
| Compiler  | React Compiler                                                                                     |

## Create a new project from this template

```bash
vp create github:diploidal/tanstack-start-vp-tempalte --directory my-app --package-manager pnpm --git --no-agent --no-editor
```

- `--directory my-app` - folder for the new project
- `--package-manager pnpm` - same package manager as the template
- `--git` - start a git repo
- `--no-agent` / `--no-editor` - skip `vp`'s own agent files and editor settings; the template already has `AGENTS.md`, `.vscode/` and `.zed/`
- Add `--no-interactive` to skip all prompts

## Getting started

```bash
vp install
vp dev
```

App runs on http://localhost:5173.

## Commands

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `vp dev`         | Start dev server                                |
| `vp check`       | Format check, lint and type check               |
| `vp check --fix` | Same, but fix what it can                       |
| `vp test`        | Run tests once (`vp test watch` for watch mode) |
| `vp build`       | Production build                                |
| `vpr deploy`     | Build and deploy to Cloudflare Workers          |
| `vpr cf-typegen` | Regenerate Worker types from `wrangler.jsonc`   |

- `vp <name>` runs a built-in Vite+ command
- `vpr <name>` (same as `vp run <name>`) runs a `package.json` script
- A pre-commit hook runs `vp check --fix` on staged files

## Project structure

```
src/
  components/
    ui/          shadcn components (generated - edit freely)
  lib/           shared helpers (theme config, utils)
  routes/        file-based routes; __root.tsx is the app shell
  globals.css    theme variables, Tailwind theme, base styles
  vite-env.d.ts  client env var types
public/                     static files (favicons)
worker-configuration.d.ts   generated Worker types (`vpr cf-typegen`)
```

Imports use the `@/` alias for `src/`.

## UI components

Add shadcn components with the CLI - they come as React Aria versions (`aria-mira` style in `components.json`):

```bash
pnpm exec shadcn add dialog
```

React Aria links (e.g. `LinkButton`) navigate through TanStack Router thanks to `AriaRouterProvider` in `__root.tsx`.

## Theming

- Theme lives on `<html data-theme="light|dark">`
- Defaults to `system` until the user picks one; the choice is saved in `localStorage`
- `ThemeScript` in `<head>` sets the theme before first paint - no flash
- Shared config is in `src/lib/theme.ts`
- Theme colors are CSS variables in `src/globals.css`; `dark:` Tailwind variants follow `[data-theme="dark"]`

## Env vars

### Client (`VITE_*`)

- Readable in browser code, inlined at build time - never put secrets here
- Local values go in `.env`
- Add types in `src/vite-env.d.ts`

```ts
import.meta.env.VITE_APP_TITLE;
```

### Server (secrets, vars, bindings)

- Local values go in `.dev.vars`
- Production: `vars` in `wrangler.jsonc` and `wrangler secret put MY_VAR`
- Types come from `vpr cf-typegen` - rerun it after changing `wrangler.jsonc`

```ts
import { env } from "cloudflare:workers";

env.MY_VAR;
```

## Deploy

Cloudflare Workers, deployed by the GitLab pipeline (`.gitlab-ci.yml`) on every push to `main`. Jobs use Vite+'s official [`setup-vp`](https://viteplus.dev/guide/ci#gitlab-ci-cd) template, so they run the same `vp` commands as locally:

1. `check` + `test` - run in parallel
2. `build:validate` (branches) / `build:production` (`main`)
3. `deploy:production` - `wrangler deploy` (`main` only)

Other branches stop after `build:validate` - only `main` deploys.

Variables live in **GitLab CI/CD** (Settings → CI/CD → Variables):

| Variable                | Scope             | Used by                            |
| :---------------------- | :---------------- | :--------------------------------- |
| `VITE_*`                | not protected     | build (inlined), branch builds too |
| Worker secrets          | masked, protected | pushed to the Worker on deploy     |
| `CLOUDFLARE_API_TOKEN`  | masked, protected | wrangler auth (`main` only)        |
| `CLOUDFLARE_ACCOUNT_ID` | masked, protected | wrangler auth (`main` only)        |

- List secret names in `WORKER_SECRET_NAMES` in `.gitlab-ci.yml` (e.g. `"API_KEY DATABASE_URL"`)
- The deploy job writes them to a temp JSON file and passes it to `wrangler deploy --secrets-file`, so secrets ship together with the new version
- A listed name without a matching CI/CD variable fails the deploy
- `--secrets-file` only adds/updates - to retire a secret, delete it once in the dashboard
- The API token needs **Workers Scripts: Edit** on the account
- Worker settings and non-secret `vars` are in `wrangler.jsonc`
- Bindings (KV, D1, R2, ...): see [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)

Manual deploy from your machine:

```bash
wrangler login
vpr deploy
```
