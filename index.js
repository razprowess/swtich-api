

import { ApolloServer } from "apollo-server";
import resolvers from "./schemas/resolvers.js";
import typeDefs from "./schemas/type-defs.js";
import decodeToken from "./utils/decode-token.js";


const server = new ApolloServer({typeDefs, resolvers, context: ({ req })=>{
      const bearer = req.headers.authorization || '';
      const token = bearer.split(" ")[1];
      const response = decodeToken(token);
      return response;
     }, cache: "bounded", cors: { origin: ['http://localhost:3000']},
}) 

server.listen().then(({url})=>{
    console.log(`App listening on URL: ${url}`)
})


