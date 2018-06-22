
// const gql = require("graphql-tag")
// const ApolloClient = require("apollo-boost").default

// fetch all links [with ids] from the relevant source, and store in data structure

// get all links from the source

// for each link, fetch the relevant information

// check if the link already exists in the db
//     if it does, update the values
require("isomorphic-fetch")
//      if it doesn't, add to the data structure.

//post updated values to the db.

fetch("http://localhost:4000/graphql", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ query: "{ Properties { title } }" }),
})
	.then(res => res.json())
    .then(res => console.log(res.data))
    

// const client = new ApolloClient({
// 	uri: "https://localhost:4000/graphql",
// })

// client
// 	.query({
// 		query: gql`
// 			{
// 				Properties {
//                     title
//                     id
// 				}
// 			}
// 		`,
// 	})
// 	.then(result => console.log(result))
