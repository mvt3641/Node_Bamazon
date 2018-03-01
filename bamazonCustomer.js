var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
// var $ = require('jQuery');
// var jsdom = require('jsdom');


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
    whatMany();
  })

};


function whatMany() {
  connection.query("SELECT * FROM products", function(err, results) {
    inquirer
      .prompt([{
          name: 'which',
          type: 'input',
          message: 'What is the Item id of the product to purchase?',
        },
        {
          name: 'HowMany',
          type: 'input',
          message: 'How many would you like to purchase?'
        }
      ]).then(function(answer) {
        // var chosenItem = answer.which;
        // //Array to hold item numbers
        var ItemArr = [];
        //Looping through results
        for (var i = 0; i < results.length; i++) {
          //pushing results[i].items to array
          ItemArr.push(results[i].item_id);
          //finding the matching item
          var idmatch = ItemArr.find(function(num) {
            // return num == chosenItem;
            return num == answer.which;
          });

        }
        var item = results[idmatch - 1].item_id;
        var itemquan = results[idmatch - 1].stock_quantity;
        var name = results[idmatch - 1].product_name;
        var update = itemquan -= answer.HowMany;
        var total = results[idmatch - 1].price *= answer.HowMany;

        if (answer.HowMany > itemquan) {
          console.log("That quantity is not avalible at this time");
          start();
        } else {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: update
              },
              {
                item_id: item
              }
            ],
            function(err) {
              if (err) throw err;
              console.log('\n');
              console.log("Sold Qty: " + answer.HowMany);
              console.log('Item ID: ' + answer.which);
              console.log('Product: '+ name);
              console.log("Total: $"+total);
              start();
            }
          );


        }
        // console.log('Chosen item number: '+answer.which);
        // console.log('Chosen Qty: '+answer.HowMany);
        // console.log(item);
        // console.log(itemquan);
        // console.log(name);

      });
  })
};


//           var item = results[idmatch].item_id -1;
//           var itemquan = results[item].stock_quantity -1;
//            var update = function(){ itemquan -= answer.HowMany;
//            };
//
//           if (answer.HowMany > itemquan){
//             console.log("That quantity is not avalible at this time");
//             start();
//
//
//           }else{
//
//             connection.query(
//               "UPDATE products SET ? WHERE ?",
//               [
//                 {
//                   stock_quantity: -answer.HowMany
//                 },
//                 {
//                   item_id: results[idmatch].item_id
//                 }
//               ],
//               function(err){
//                 if (err) throw err;
//                 console.log("sold Qty: "+answer.HowMany+'Item ID: '+answer.which)
//                 start();
//               }
//             );
//           }
//
//     })
//
// }
