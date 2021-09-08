import {typeDefs} from './graphql/schema.ts';
const { ApolloServer, gql } = require('apollo-server');
import {resolvers} from './graphql/resolvers';
import db from '../models';
import {createUsers, createProjects, createAssignments, getUsers} from '../src/utils';


// import { createUserTable, createProjectTable, createAssignmentsTable, listTables, 
//     addUser, addProject, addAssignment, getUsers } from './utils';

// createUserTable();
// createProjectTable();
// createAssignmentsTable();
// listTables();
// addUser('Deepan', 'deepan@deepan.com', 'abc123');
// addUser('Ramesh', 'remesh@ramesh.com', 'def123');
// addProject('Learing React', 'active');
// addProject('Reading Angular', 'active');
// addProject('Observing Java', 'completed');
// addProject('Watching Dotnet', 'completed');
// addAssignment('deepan@deepan.com', 3, 'Deepan');
// addAssignment('remesh@ramesh.com', 4, 'Ramesh');
// getUsers();



// createUsers();
// createProjects();
// createAssignments();
getUsers();





// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });




// https://sequelize.org/master/manual/model-basics.html
db.sequelize.sync().then(() => {
    server.listen().then(({url}:{url: String}) => {
        console.log(`🚀 Server ready at ${url}`);
    })
});



// The `listen` method launches a web server.
// 'url' destructured is the from the response. for getting response 'npm run dev'
// server.listen().then((response: Object) => {
//     console.log(response);
// })

// Now, the below one is taken inside db.sequelize.sync()
// server.listen().then(({url}:{url: String}) => {
//     console.log(`🚀 Server ready at ${url}`);
// })

