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
    displayStore();
});

function displayStore(){

    console.log("                            FOR SALE                              \n");
    console.log("ID #          Product          Department          Price");
    
    connection.query("SELECT * FROM products", function(err, result){
        if(err) throw err;
        result.forEach(function(element){
            console.log(`${element.item_id}         ${element.product_name}             ${element.department_name}             $${element.price}\n`);
        });
        buyAThing();  
    });  
      
};

function buyAThing(){
    inquirer.prompt([
        {
            name: "itemID",
            message: "Provide the ID number of the item you wish to buy"
        },
        {
            name: "howMany",
            message: "How many would you like?"
        }
    ]).then(function(response){
        //Check to see if item is in stock. If not, let user know.
        console.log(response);
    });
    connection.end();
};

