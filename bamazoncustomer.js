let mysql = require('mysql');
var inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '89482579Ab',
    database: 'bamazon_db'
});


function run() {
    connection.connect();
     var queryString = 'SELECT * FROM products';
     connection.query(queryString, function(err, res, fields) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
          console.log(
            "Item ID: " + res[i].item_id + "\n" +
            "Product: " + res[i].product_name + "\n" + 
            "Department: " + res[i].department_name + "\n" +
            "Price: " + res[i].sale_price + "\n");
          console.log("-------------------------");
        }
        runInquirer(res);
    });
};


function runInquirer(products) {``
inquirer
  .prompt([
    {
        type: "list",
        choices: products.map(function(val) {
          return val.item_id;
        }),
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
    var product = products.filter(function(val) {
      return val.item_id == itemID;
    })
    executeOrder(product[0], orderQuantity);
  });
};


function executeOrder(product, orderQuantity) {
      var currentInventory = product['stock_quantity'];
      if (orderQuantity > currentInventory) {
        console.log("Insufficient inventory!");
        run();
      } else {
        console.log("Order placed!");
        updateInventoryBalance(product, orderQuantity);
        calcOrderCost(parseInt(product.sale_price), orderQuantity);
      };
    }
   

function updateInventoryBalance(product, orderQuantity) {
  var currentInventory = product.stock_quantity;
  var newInventory = parseInt(currentInventory - orderQuantity);
  var query = `UPDATE products SET stock_quantity = ? WHERE item_id = ?`;
  var c = connection.query(query, [newInventory, itemID], function(err, res, fields) {
    if (err) {
      return console.log(err.message);
    } 
  });
}


function calcOrderCost(price, orderQuantity) {
      var orderCost = price * orderQuantity;
      console.log("Total Cost: " + orderCost);
};


run();

