const { gql } = require("apollo-server-core");


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql `
    # This "Book" type defines the queryable fields for every book in our data source.

    type User {
        id: String
        name: String
        email: String
        projects: [Project]
      }
    
    type Project {
        id: Int
        title: String
        status: String
        members: [User]
    }
    
    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    
    type Query {
        users: [User]
      }
    `;

    // type User {
    //   id: String
    //   name: String
    //   email: String
    //   password: String
    //   projects: [Project]
    // }