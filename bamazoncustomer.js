let mysql = require('mysql');
var inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89482579Ab',
    database: 'bamazon_db'
});

// displayProducts();

connection.connect();
 var queryString = 'SELECT * FROM products';
 connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
     for (var i in rows) {
        console.log('Item ID: ', rows[i].item_id);
    }
});
connection.end();


// var purchase_itemID;
// var purchase_quantity;
// inquirer
//   .prompt([
//     {
//         type: "list",
//         choices: {purchase_itemID},
//         name: "purchase_itemID",
//         message: "Select a product"
//     },
//     {
//         type: "input",
//         name: "purchase_quantity",
//         message: "Enter the quantity to purchase"
//     }
//   ])
//   .then((answers) => {
//     //   console.log(answers.query_type, "...", answers.query_type2);
//       userQuery = answers.userQuery;
//       command = answers.command;
//       run();
//   });

// function displayProducts() {
//     let sql = `SELECT products.item_id, products.product_name, products.sale_price FROM products`;
//     connection.query(sql, (error, results) => {
//       if (error) {
//         return console.error(error.message);
//       }
//       console.log(results);
//     });
//     connection.end(); 
// };

