import { Context, Post, User } from "./types";

export type GetPostQueryParams = {
	id: string;
};

export type GetUserQueryParams = {
	id: string;
};

export type CreateUserMutationArgs = {
	name: string;
	email: string;
};

export type CreatePostMutationArgs = {
	title: string;
	content: string;
	authorId: string;
};

export type PublishPostMutationArgs = {
	id: string;
};

export type DeletePostMutationArgs = {
	id: string;
};

export interface Mutation {
	createUser(_: any, args: CreateUserMutationArgs, ctx: Context): User;
	createPost(_: any, args: CreatePostMutationArgs, ctx: Context): Post;
	publishPost(_: any, args: PublishPostMutationArgs, ctx: Context): Post;
	deletePost(_: any, args: DeletePostMutationArgs, ctx: Context): boolean;
}

export interface Query {
	users(_: any, __: any, ctx: Context): User[];
	user(_: any, params: GetUserQueryParams, ctx: Context): User | null;
	posts(_: any, __: any, ctx: Context): Post[];
	post(_: any, params: GetPostQueryParams, ctx: Context): Post | null;
	publishedPosts(_: any, __: any, ctx: Context): Post[];
}

export interface Resolvers {
	Query: Query;
	Mutation: Mutation;
  User: {
    posts: (parent: User, _: any, ctx: Context) => Post[],
  }
  Post: {
    author: (parent: Post, _: any, ctx: Context) => User,
  }
}
