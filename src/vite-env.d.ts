// Client env vars - only `VITE_*` vars are exposed, inlined at build time
interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
}
