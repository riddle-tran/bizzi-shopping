export type TThumbnail =
  | 'C'
  | 'Go'
  | 'Vue'
  | 'Java'
  | 'Node'
  | 'React'
  | 'Slack'
  | 'Github'
  | 'Angular'
  | 'Typescript'
  | 'Javascript';
export interface IProductBase {
  name: string;
  price: number;

  // Optional
  description?: string;
  thumbnail?: TThumbnail;
}

export interface IProduct extends IProductBase {
  id: string;
}
