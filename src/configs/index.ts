export const GITHUB_REDIRECT_URI: string =
  process.env.REACT_APP_GITHUB_REDIRECT_URI;

export const GITHUB_SCOPE: string = ['read:user', 'user:email'].join(' ');

export const GITHUB_CLIENT_ID: string = process.env.REACT_APP_GITHUB_CLIENT_ID;

export const BIZZI_BASE_GRAPHQL_URL: string = `${process.env.REACT_APP_BIZZI_GRAPHQL_URL}`;

export const GITHUB_AUTHORIZE_URL: string = `${process.env.REACT_APP_GITHUB_AUTHORIZE_URL}?`;
