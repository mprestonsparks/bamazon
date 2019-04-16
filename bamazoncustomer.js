let mysql = require('mysql');
var inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89482579Ab',
    database: 'bamazon_db'
});


function getOrderInfo() {
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
    
    // connection.end();
};


function runInquirer(productIDs) {
inquirer
  .prompt([
    {
        type: "list",
        choices: productIDs,
        name: "item_IDs",
        message: "Select an ItemID..."
    },
    {
        type: "input",
        name: "order_quantity",
        message: "Enter quantity to order..."
    }
])
.then((answers) => {
    itemID = answers.item_IDs;
    orderQuantity = parseInt(answers.order_quantity);
    console.log("Selected ItemID: " + itemID);
    console.log("Quantity Ordered: " + orderQuantity);
    checkInventoryBalance();
  });
};


function checkInventoryBalance() {
    var inventoryBalance = 'SELECT stock_quantity FROM products WHERE item_id = ?'
    connection.query(inventoryBalance, itemID, function(err, rows, fields) {
    if (err) {
    return console.error(err.message);
    }
    console.log(rows);
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

// displayProducts();
getOrderInfo();

