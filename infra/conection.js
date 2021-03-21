const mysql = require('mysql')
const conection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'db-agenda-petshop',
  insecureAuth: true
})

module.exports = conection
