//Need to access Inquirer and MySQL modules.
const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

//Help establish our database connection for bamazon
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "MichaelAiden2020",
    database: "bamazon"
});

//When the connection is made, we want to show the store.
connection.connect(function (err) {
    if (err) throw err;
    displayStore();
});

//This function will display what is in the store and from there, call a function ask the customer if they want to buy anything.
function displayStore(){
    
    connection.query("SELECT * FROM products", function(err, result){
        if(err) throw err;        
        console.log("")
        console.table(result);
        buyAThing();  
    });      
};

/*Function that asks a user for an item ID and the amount of that item they wish to purchase. If stock is available, the app will update the user with how much the total will be. If there is not enough stock, then an Insufficient Stock message will appear. In both
cases, the app will end.*/
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
            console.log("");
            //If the store doesn't even have the item, then 
            if(res.length === 0){
                
                console.log("The item ID number does not exist");
            }
            else if(response.howMany > res[0].stock_quantity || res[0].stock_quantity === 0){
                console.log("Insufficient Inventory! Try again later.");                
            }            
            else{                
                let total = res[0].price * response.howMany;
                let reducedStock = res[0].stock_quantity - response.howMany;
                console.log(`Absolutely. That will be $${total}. Thank you.`);
                connection.query(`UPDATE products SET stock_quantity = ${reducedStock} WHERE item_id = ${response.itemID}`,function(err){
                    if(err) throw(err);
                });
            };
            //End the connection
            connection.end();
        });
    });    
};

