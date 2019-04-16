let mysql = require('mysql');
var inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89482579Ab',
    database: 'bamazon_db'
});

// itemIds = [];
function getInfo() {
    connection.connect();
     var queryString = 'SELECT * FROM products';
     connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;
        productIDs = [];
        for (var i in rows) {
            productIDs.push(rows[i].item_id);
        };
        // console.log(itemIds);
        runInquirer(productIDs);
    });
    connection.end();
};

// console.log(itemIds.length);


function runInquirer(productIDs) {
inquirer
  .prompt([
    {
        type: "list",
        choices: productIDs,
        name: "item_IDs",
        message: "Select a query type"
    }
])
.then((answers) => {
    itemID = answers.item_IDs;
    console.log(productIDs);
    console.log("Selected ItemID: " + itemID);

  });
};


function displayProducts() {
    let sql = `SELECT products.item_id, products.product_name, products.sale_price FROM products`;
    connection.query(sql, (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      console.log(results);
    });
    connection.end(); 
};

getInfo();

