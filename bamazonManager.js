const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "MichaelAiden2020",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    managerOptions();
});

function managerOptions() {
    inquirer.prompt([
        {
            name: "option",
            message: "Hello, random manager. What would you like to do today?",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answer) {

        switch (answer.option) {

            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addNew();
                break;
        };
    });
};

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(function (element) {
            console.log(`${element.item_id}         ${element.product_name}         $${element.price}         ${element.stock_quantity}\n`);
        });
        connection.end();
    });
};

function lowInventory(){
    connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res){
        if(err) throw err;
        res.forEach(function(element){
            console.log(`${element.product_name}     ${element.stock_quantity}`);
        });
        connection.end();
    });
};

function addInventory(){
    
    inquirer.prompt([
        {
            name: "item",
            message: "Which product do you want to restock?",
        },
        {
            name: "restock",
            message: "How many do you want to add?"
        }
    ]).then(function(response){

        let item = response.item;
        let restock = response.restock;

        connection.query(`UPDATE products SET stock_quantity = (${restock} + stock_quantity) WHERE product_name = ?`, [item], function(err, res1){
            if (err) throw err;
            viewProducts();
        });
    });
};

function addNew(){
    inquirer.prompt([
        {
            name: "product",
            message: "What item would you like to add?"
        },
        {
            name: "department",
            message: "Which Department will it go to?"
        },
        {
            name: "price",
            message: "How much does it cost? (X.XX)"
        },
        {
            name: "stock",
            message: "How many will we have in stock?"
        }
    ]).then(function(response){
        connection.query(`INSERT INTO products SET ?`,{
            product_name: response.product,
            department_name: response.department,
            price: response.price,
            stock_quantity: response.stock
        }, function(err){
            if (err) throw err;
            viewProducts();
        });
    });
};
