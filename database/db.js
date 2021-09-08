
// export const users = [
//         {
//             name: 'Deepan',
//             email: 'deepan@deepan.com',
//             projects: [{title: 'Working with ReactJS'}]
//         },
//         {
//             name: 'Rajes',
//             email: 'rajesh@rajesh.com',
//             projects: [{title: 'Working with JS'}]
//         },
//     ];



// https://node-postgres.com/features/connecting
const { Pool } = require('pg')
import dotenv from 'dotenv';

dotenv.config();
// console.log(process.env.DB_HOST);

export const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'ts-gql',
    password: process.env.DB_PASS,
    port: 5432,
  })
//   client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })