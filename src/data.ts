import { Post, User } from "./types";

export const users: User[] = [
	{
		id: "1",
		name: "Tina",
		email: "tina@user.com",
	},
	{
		id: "2",
		name: "Bruce",
		email: "bruce@user.com",
	},
];

export const posts: Post[] = [
	{
		id: "1",
		title: "Começando com GraphQL",
		content: "é uma ferramenta de liguagem de query",
		published: false,
		authorId: "1",
	},
	{
		id: "2",
		title: "Carros mais vendidos no Brasil",
		content: "O Honda civic vem liderando",
		published: true,
		authorId: "1",
	},
	{
		id: "3",
		title: "Como o mercado de cripto esta mudando",
		content: "não se fala mais no bitcoin como antes",
		published: true,
		authorId: "2",
	},
];
