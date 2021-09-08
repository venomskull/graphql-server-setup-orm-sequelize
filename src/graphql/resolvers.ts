// import {users} from '../../database/db'
import { getUsers } from "../utils";


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

export const resolvers = {
        Query: {
            // users: () => users,
            users: async () => getUsers(),
        }
    };


