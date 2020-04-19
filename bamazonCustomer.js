var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host: "localhost",
    user: "",
    password:"",
    database: "bamazon_db",
    port: 3330
});

connection.connect();