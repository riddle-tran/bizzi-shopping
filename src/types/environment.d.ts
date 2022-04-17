declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BIZZI_VERSION: string;
      REACT_APP_BIZZI_GRAPHQL_URL: string;
      REACT_APP_GITHUB_CLIENT_ID: string;
      REACT_APP_GITHUB_REDIRECT_URI: string;
      REACT_APP_GITHUB_AUTHORIZE_URL: string;
    }
  }
}
export {};
