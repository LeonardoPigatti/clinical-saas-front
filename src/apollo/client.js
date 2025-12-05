import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

// Cria um link HTTP para o servidor GraphQL
const httpLink = new HttpLink({
  uri: "http://localhost:3333/graphql", // substitua pela URL do seu backend
});

// Cria o client Apollo
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
