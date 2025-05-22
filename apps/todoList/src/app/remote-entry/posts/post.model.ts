export interface Pagination<T> {
  totalCount: number;
  items: T[];
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostListInput {
  page: number;
  limit: number;
  sort: keyof Post;
  order: 'asc' | 'desc';
  query: string;
}
