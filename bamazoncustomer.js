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
        runInquirer(productIDs);
    });
    // connection.end();
};


function runInquirer(productIDs) {``
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
    orderQuantity = answers.order_quantity;
    console.log("Selected ItemID: " + itemID);
    console.log("Quantity Ordered: " + orderQuantity);
    checkInventoryBalance();
  });
};


function checkInventoryBalance() {
    var inventoryBalance = 'SELECT stock_quantity FROM products WHERE item_id = ?'
    connection.query(inventoryBalance, itemID, function(err, res, fields) {
    if (err) {
    return console.error(err.message);
    } else {
      var orderSize = 4;
      var currentInventory = res[0].stock_quantity;
      if (orderSize > currentInventory) {
        console.log("Insufficient inventory!");
        
      } else {
        console.log("Order placed!");
        updateInventoryBalance(orderSize);
        calcOrderCost(orderSize);
      }
    }
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


function updateInventoryBalance(orderSize) {
    console.log("called updateInventory");
    console.log("itemID...",itemID);
    console.log('currentInventory...',inventoryBalance);

    
    var currenInventory = 'SELECT stock_quantity FROM products WHERE item_id = ?'
    // ** Set value1 on next line equal to currentInventory minus orderSize
    var query = 'UPDATE products SET stock_quantity = value1 WHERE item_id = ?'
    connection.query(query, itemID, function(err, res, fields) {
      if (err) {
        return console.log(err.message);
      } else {

      // CODE GOES HERE



      };
    });
}


function calcOrderCost(orderSize) {
    console.log("called calcOrderCost");
};


// displayProducts();
getOrderInfo();

