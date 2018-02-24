var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');


var connection = mysql.createConnection({

  host: 'localhost',
  port: 3306,

  user: 'root',


  password: 'root',
  database: 'bamazon_db'
});



connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log("                                               \n");
    console.table(results);
    console.log("************************************************");
  })
  whatMany();
};


function whatMany() {
  inquirer
    .prompt([{
        name: 'which',
        type: 'input',
        message: 'What is the Item id of the product to purchase?'
      },
      {
        name: 'HowMany',
        type: 'input',
        message: 'How many would you like to purchase?'
      }
    ]).then(function(answer) {
      //Query the DB for results
      connection.query("SELECT * FROM products", function(err, results) {
        var chosenItem = answer.which;
        //Array to hold item numbers
        var ItemArr = [];
        //Looping through results
        for (var i = 0; i < results.length; i++) {
          //pushing results[i].items to array
          ItemArr.push(results[i].item_id);
          //finding the matching item
          var idmatch = ItemArr.find(function(num) {
            return num == chosenItem;
          });
        };
        console.log('$'+idmatch.price);


      })
      console.log(answer.HowMany);
    })
}
