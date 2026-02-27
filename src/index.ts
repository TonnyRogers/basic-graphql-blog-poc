import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import express from "express";
import { typeDefinitions } from "./schemas";
import { resolvers } from "./resolvers";
import { posts, users } from "./data";
import cors from "cors";

async function main() {
	const app = express();

	const server = new ApolloServer({
		typeDefs: typeDefinitions,
		resolvers: resolvers as any,
	});
	await server.start();

	app.use(
		"/graphql",
		cors(),
    express.json(),
		expressMiddleware(server, {
			context: async () => ({
				db: {
					users,
					posts,
				},
			}),
		}),
	);

	app.listen(4000, () => {
		console.log("🚀 Server ready at http://localhost:4000/graphql");
		console.log("Apollo Sandbox available at same URL");
	});
}

main().catch(console.error);
