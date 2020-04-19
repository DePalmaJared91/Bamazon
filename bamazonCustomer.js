var mysql = require("mysql");
var inquirer = require("inquirer");



var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"Lear75ct",
    database: "bamazon_db",
    port: 3306
});

connection.connect(function (err){
    if(err) throw err;
    console.log("Connected!");
});

displayProducts();
var displayProducts = function() {
    var query = "Select * FROM products";
    connection.query(query, function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + "|| Product Name: " + 
            res[i].product_name + " || Price: " + res[i].price);
        }
        requestProduct();
    });
};

var requestProduct = function() {
    inquirer.prompt([{
        name: "productID",
        type: "input",
        message: "Please enter the product you want!",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }

    }]).then(function(answer) {

        var query = "Select stock_quantity, price, product_sales, department_name FROM products WHERE ?";
        connection.query(query, { item_id: answer.productID}, function(err, res){
            if(err) throw err;
            var available_stock = res[0].stock_quantity;
            var price_per_unit = res[0].price;
            var productSales = res[0].product_sales;
            var productDepartment = res[0].department_name;

            if (available_stock >= answer.productUnits){
                completePurchase(available_stock, price_per_unit, productSales, productDepartment, answer.productID, answer.productUnits);
            } else {
                console.log("Not Enough Stock");

                requestProduct();

            }

        });

    });
};

var completePurchase = function(availableStock, price, productSales, productDepartment, selectedProductID, selectedProductUnits) {

    var updatedStockQuantity = availableStock - selectedProductUnits;
    var totalPrice = price * selectedProductUnits;
    var updatedProductSales = parseInt(productSales) + parseInt(totalPrice);


    var query = "UPDATE products SET ? WHERE ?";
        connection.query(query,[{
        stock_quantity: updatedStockQuantity,
        product_sales: updatedProductSales
    }, {
        item_id: selectedProductID

    }], function(err, res) {
        if (err) throw err;

        console.log("Purchase Completed");

        console.log("Your payment has been recieved to the price of : " + totalPrice);

        updateDepartmentRevenue(updatedProductSales, productDepartment);

    });
};

var updateDepartmentRevenue = function(updatedProductSales, productDepartment) {
    var query = "Select total_sales FROM departments WHERE ?";
    connection.query(query, { department_name: productDepartment}, function(err, res) {
    
        if (err) throw err;

        var departmentSales = res[0].total_sales;

        var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedProductSales);

        completeDepartmentSalesUpdate(updatedDepartmentSales, productDepartment);
    });
};

var completeDepartmentSalesUpdate = function(updatedDepartmentSales, productDepartment) {

    var query = "UPDATE departments SET ? WHERE ?";
    connection.query(query, [{

        total_sales: updatedDepartmentSales
    },{
        department_name: productDepartment
    }],  function(err, res) {
        if (err) throw err;

        displayProducts();
    });

};




