const express = require('express');
const app = express();
//  const path = require('path');
//  app.use(express.static(path.join(__dirname,"style")));
  var bodyParser = require('body-parser');
 app.set('view engine', 'ejs');
  app.get('/', function(req, res) {
    res.render('rayon');
});
var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
     user     : 'root',
    password : '',
    database: 'mia BD'
 });
   var urlencodedParser = bodyParser.urlencoded({
    extended: false
   })
   connection.connect(function (error) {
     //condition connect
      if (!!error) {
         console.log('Failed to connect :(');
      } else {
          console.log('Connected :D');
     }
 });
 
 
 connection.query('SELECT * FROM rayon', (err,result,fields) => {
   if(err) throw err;
  console.log('Data received from mia rayon:');
  console.log(result);
 });
 const rayon = { id: '3', produit: 'chocolat',fournisseur:'Milka' };
 connection.query('INSERT INTO rayon SET ?', rayon, (err, res) => {
   if(err) throw err;
   console.log('Last insert ID:', res.insertId);
 });
 connection.query(
  'UPDATE rayon SET produit = ? Where ID = ?',
  ['oeuf', 1],
  (err, result) => {
    if (err) throw err;
    console.log(`Changed ${result.changedRows} row(s)`);
  }
);
connection.query(
  'DELETE FROM rayon WHERE id = ?', [3], (err, result) => {
    if (err) throw err;
    console.log(`Deleted ${result.affectedRows} row(s)`);
  }
);

app.listen(process.env.port || 3000,function(){
    console.log('now listening for request');
});