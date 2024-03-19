interface ImportMetaEnv {
  readonly MODE: 'development' | 'production' | 'test'
  readonly VITE_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
