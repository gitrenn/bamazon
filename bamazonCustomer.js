let inquirer = require("inquirer");
let mysql = require("mysql");

// create connection 
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "P@ssw0rd",
    database: "bamazon"
});

// establish connection 

connection.connect(err => {
    if (err) throw err;
    console.log("Connection Success!");
});


// end connection 
function endConnection() {
    connection.end();
}

function promptUser() {
    inquirer.prompt(
        {
            type: "list",
            name: "choice1",
            message: "Welcome to Bamazon, what would you like to do?",
            choices: ["Display all items for sale", "I don't know, surprise me!"]
        },
        {
            type: "list",
            name: "choice2",
            message: "Would you like to place an order?",
            choices: ["yes!", "no"]
        }
    ).then(answer => {
        if (answer.choice1 === "Display all items for sale") {

            displayItems();

        } else if (answer.choice2 === "yes") {
            promptUserOrder();
        }

        else {
            console.log("Thanks for visiting! Bye");
        }
    })

}

function displayItems() {
    var query = "SELECT * FROM products";
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(e => {
            console.log(`Id: ${e.item_id}, Product: ${e.product_name}, Price: ${e.price}`);
        });
    });

}

function ifPlaceOrder() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Would you like to place an order?",
        choices: ["yes!", "no"]
    }).then(res => {
        if (res.choice === "yes") {

            promptUserOrder();
        }
    })
}

function promptUserOrder() {
    inquirer.prompt(
        {
            type: "input",
            name: "id",
            message: "please enter the id of the product you'd like to purchase"
        },
        {
            type: "input",
            name: "quantity",
            message: "please enter the number of units of the product you'd like to purchase"
        }
    ).then(res => {
        console.log(res.id);
        console.log(res.quantity);

    })
}

promptUser();
