export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export interface Context {
  db: {
    users: User[];
    posts: Post[];
  }
}