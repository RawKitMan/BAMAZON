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
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = ?", [response.itemID], function(err, res){
            if(err) throw err;
            if(response.howMany > res[0].stock_quantity || res[0].stock_quantity === 0){
                console.log("Insufficient Inventory! Try again later.");
                console.log(res);
            }
            else{
                console.log(res);
                console.log(res[0].price);
                console.log(response.howMany);
                let total = res[0].price * response.howMany;
                let reducedStock = res[0].stock_quantity - response.howMany;
                console.log(`Absolutely. That will be $${total}. Thank you.`);
                connection.query(`UPDATE products SET stock_quantity = ${reducedStock} WHERE item_id = ${response.itemID}`,function(err){
                    if(err) throw(err);
                });
            };
            connection.end();
        });
    });
    
};

