import db from '../models';
import { assignments } from '../seeders/assignments';
import { projects } from '../seeders/projects';
import { users } from '../seeders/users';

export const createUsers = () => {
    users.map(user => {
        db.User.create(user);
    })
}

export const createProjects = () => {
    projects.map(project => {
        db.Project.create(project);
    })
}

export const createAssignments = () => {
    assignments.map(assignment => {
        db.ProjectAssignment.create(assignment);
    })
}

interface project {
    id: number;
    title: string;
    status: string;
}

interface user {
    id: number;
    name: string;
    email: string;
    Projects: project [];
}

export const getUsers = async (): Promise<user[]> => {
    const userdata = await db.User.findAll({
        include: {
            model: db.Project,
            through: {
                attributes: []
            }
        }
    });

    // const userdata = await db.User.findAll();
    // console.log(userdata);
    // console.log(JSON.stringify(userdata));

    const users = await userdata.map((user: user) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            projects: user.Projects
        }
    })
    // console.log(JSON.stringify(users));
    return users;
}



// ================================================================================

// // https://node-postgres.com/features/connecting
// // https://node-postgres.com/features/queries
// // https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/

// import { pool } from "../database/db";
// import { v4 as uuidv4 } from 'uuid';

// interface User {
//     id: string
//     name: string
//     email: string
//     password: string

// }

// pool.connect();

// export const readQuery = async (query: string) => {
//     try {
//         const res = await pool.query(query);
//         return res.rows;
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const getUsersFromUsersTable = async () => {
//     const query = `
//         SELECT * FROM users;
//     `;
//     return readQuery(query);
// }

// export const getAssignments = async () => {
//     const query = `
//         SELECT user_name, p.title, p.status, a.user_id, p.id AS project_id
//         FROM users u
//         INNER JOIN assignments a ON
//             u.id = a.user_id
//         INNER JOIN projects p ON
//             p.id = a.project_id
//     `;
//     return readQuery(query);
// }

// export const findUserByEmail = async (email: string) => {
//     const query = {
//         text: 'SELECT * FROM users WHERE email = $1',
//         values: [email]
//     }

//     try {
//         const res = await pool.query(query);
//         return res.rows;
//     } catch (err) {
//         console.log(err)
//     }

//     // This return is used as if nothing is returned then it shows undefined. 
//     // So, one default return is been used
//     return [{
//         id: '0',
//         name: 'Name',
//         email: 'email@email.com',
//         password: 'password'
//     }]
// }

// export const addUser = async (name: string, email: string, password: string) => {
//     const query = {
//         text: 'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4)',
//         values: [uuidv4(), name, email, password],
//     }

//     const userQuery = await findUserByEmail(email);
//     if (userQuery?.length === 0) {
//         try {
//             const res = await pool.query(query);
//             console.log('Added user successfully');
//         } catch (err) {
//             console.log(err);
//         }
//     } else {
//         console.log('User already exists. Check your email address entered');
//     }
// }

// export const addProject = async (title: string, status: string) => {
//     const query = {
//         text: 'INSERT INTO projects(title, status) VALUES($1, $2)',
//         values: [title, status],
//     }

//     try {
//         const res = await pool.query(query);
//         console.log('Added project successfully');
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const addAssignment = async (user_email: string, project_id: number, user_name: string ) => {
//     let user_id = '';
//     const user = await findUserByEmail(user_email);
//     if (user?.length === 0) {
//         console.log('User does not exist for the given email');
//     } else {
//         user_id = user[0].id;
//     }

//     const query = {
//         text: 'INSERT INTO assignments(project_id, user_id, user_name) VALUES($1, $2, $3)',
//         values: [project_id, user_id, user_name]
//     }

//     try {
//         const res = await pool.query(query);
//         console.log('Added assignmet successfully');
//     } catch (err) {
//         console.log(err);
//     }
// }


// // export const getUsers = async () => {
// //     const query = `
// //         SELECT * FROM users;
// //     `;

// //     try {
// //         const res = await pool.query(query);
// //         // console.log(res.rows);
// //         return res.rows;
// //     } catch (err) {
// //         console.log(err);
// //     }
// // }

// export const getUsers = async () => {
//     const usersFromUsersTable = await getUsersFromUsersTable();
//     const assignments = await getAssignments();

//     const users = await usersFromUsersTable?.map(async user => {
//         let projects: object[] = [];

//         await assignments?.forEach(assignment => {
//             if (user.id === assignment.user_id) {
//                 projects.push({
//                     id: assignment.project_id,
//                     title: assignment.title,
//                     status: assignment.status
//                 });
//             }
//         })

//         return ({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             password: user.password,
//             projects: projects
//         });
//     });
    
//     return users;
// }

// export const listTables = async () => {
//     const query = `
//         SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'public'
//         ORDER BY table_name;
//     `;

//     try {
//         const res = await pool.query(query);
//         // console.log(res);
//         console.log(res.rows);
//     } catch (err) {
//         console.log(err);
//     }
// }

// export const createUserTable = async () => {
//     const query = `
//     CREATE TABLE users (
//         id varchar primary key,
//         name varchar,
//         email varchar,
//         password varchar
//     );
//     `;
//     return readQuery(query);
//     // return readQuery(query) ? 'Created users table' : 'Unable to create users table';
// }

// export const createProjectTable = async () => {
//     const query = `
//         CREATE TABLE projects (
//             id serial primary key,
//             title varchar,
//             status varchar
//         )
//     `;
//     return readQuery(query) ? 'Created projects table' : 'Unable to create projects table';
// }

// export const createAssignmentsTable = async () => {
//     const query = `
//         CREATE TABLE assignments (
//             id serial,
//             project_id int references projects (id),
//             user_id varchar references users (id),
//             primary key (project_id, user_id),
//             user_name varchar
//         )
//     `;
//     return readQuery(query) ? 'Created assignments table' : 'Unable to create assignments table';
// }




