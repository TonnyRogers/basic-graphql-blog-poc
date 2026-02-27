import { Resolvers } from "./graphql-type";
import { Context, Post, User } from "./types";

let nextId = 3;

export const resolvers: Resolvers = {
	Query: {
		users: (_: any, __: any, ctx) => ctx.db.users,
		user: (_: any, { id }, ctx: Context) =>
			ctx.db.users.find((u) => u.id === id) ?? null,
		posts: (_: any, __: any, ctx) => ctx.db.posts,
		post: (_: any, { id }, ctx: Context) =>
			ctx.db.posts.find((p) => p.id === id) ?? null,
		publishedPosts: (_, __, ctx) => ctx.db.posts.filter((p) => p.published),
	},
	Mutation: {
		createUser: (_, args, ctx) => {
			const user: User = {
				id: String(nextId++),
				...args,
			};
			ctx.db.users.push(user);
			return user;
		},
		createPost(_, args, ctx) {
			const post: Post = {
				id: String(nextId++),
				published: false,
				...args,
			};
			ctx.db.posts.push(post);
			return post;
		},
		publishPost(_, args, ctx) {
			const post = ctx.db.posts.find((p) => p.id === args.id);
			if (!post) throw new Error(`Post ${args.id} not found`);
			post.published = true;
			return post;
		},
		deletePost(_, args, ctx) {
			const idx = ctx.db.posts.findIndex((p) => p.id === args.id);
			if (idx === -1) return false;
			ctx.db.posts.splice(idx, 1);
			return true;
		},
	},
	Post: {
		author: (parent, _, ctx) => ctx.db.users.find((u) => u.id === parent.id)!,
	},
  User: {
    posts:(parent, _, ctx) => ctx.db.posts.filter(p => p.authorId === parent.id),
  }
};
