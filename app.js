// import lib

const express = require('express');
const config = require('./config');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const db= require('./db');
const { query } = require('./db');

// setup static folder

app.use(express.static(__dirname + "/public"));
// setup ejs lib for view engin
app.set("view engine", "ejs");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Connect To Database
const connection =  mysql.createConnection({
    host: config.dbConnection.host,
    user: config.dbConnection.user,
    password: config.dbConnection.password,
    port: config.dbConnection.port,
    database: config.dbConnection.database
    

})


//test connection 
connection.connect ((err) => {
    if (err){
        throw err;
    }
    console.log("connected To DataBase")
    connection.query("Show Tables", (err, result) =>{
        if (err){
            throw err;
        }
        console.log("result", result)
    });
})


// recive the requist from URL Routing then send response

app.get('/', (req,res) =>{
    connection.query(db.query.selectColors, (err,result) =>{
        if (err) {
            throw err;
        }
        res.render('index',{ colors: result});
    })

})

//Client Module
// View Add new Client View Page
app.get('/views/add-new-client', (req,res) =>{
    res.render('add-new-client');
})
// Add new Client To DB
router.post("/add-new-client-submitt", (req,res) =>{
   // const  query = `INSERT INTO client (fir) VALUES ('${req.body.name}')`;

 const query =`INSERT INTO clients (firstName , lastName , gender,category , dateOfBirth , address1, address2, state, postcode, city, country)
 VALUES('${req.body.firstName}','${req.body.lastName}','${req.body.gender}','${req.body.category}','${req.body.dateOfBirth}','${req.body.address1}','${req.body.address2}','${req.body.state}','${req.body.postalcode}','${req.body.city}','${req.body.country}')`;


     connection.query(query, (err,result) =>{
         if (err) {
             throw err;
         }
         res.writeHead(302,{
             location:"/views/client-view"
         });
         res.end();
     });
 });

//Update Client On DB 
 router.post("/update-new-client-submitt/:id", (req,res) =>{
     const query=`UPDATE clients SET firstName='${req.body.firstName}',lastName='${req.body.lastName}',gender='${req.body.gender}',category='${req.body.category}',dateOfBirth='${req.body.dateOfBirth}',address1='${req.body.address1}',address2='${req.body.address2}',state='${req.body.state}',postcode='${req.body.postalcode}',city='${req.body.city}',country='${req.body.country}' WHERE Id ='${req.params.id}'`
      connection.query(query, (err,result) =>{
          if (err) {
              throw err;
          }
          res.writeHead(302,{
              location:"/views/client-view"
          });
          res.end();
      });
  });
//Delete Client From DB
router.post("/delete-client", (req,res) =>{
    const query=`DELETE FROM clients  WHERE Id ='${req.body.id}'`
     connection.query(query, (err,result) =>{
         if (err) {
             throw err;
         }
         res.writeHead(302,{
         });
         res.end();
     });
 });

 //view Clients Page witg data

 app.get('/views/client-view', (req,res) =>{

    connection.query(db.query.selectAllClints, (err,result) =>{
        if (err) {
            throw err;
        }
        res.render('client-view',{ clients: result});
       
        
    })
})

// Details Page view
app.get('/views/client-view/:id', function (req,res){
    const query = `SELECT * FROM clients WHERE id = ${req.params.id}`;

    connection.query(query, (err,result) =>{
       if (err) {
           throw err;
       }
       res.render('client-details',{ clients: result[0]});
   })

})

//end Client Module

app.get('/views/add-new-event', (req,res) =>{
    res.render('add-new-event');
})
app.get('/views/add-new-team-group', (req,res) =>{
    res.render('add-new-team-group');
})
app.get('/views/add-new-team-member', (req,res) =>{
    res.render('add-new-team-member');
})

app.get('/views/event-view', (req,res) =>{
    res.render('event-view');
})

app.get('/views/item-view', (req,res) =>{
    res.render('item-view');
})
app.get('/views/packages-view', (req,res) =>{
    res.render('packages-view');
})

app.get('/views/team-view', (req,res) =>{
    res.render('team-view');
})


//Login, logout and register pages
app.get('/login', (req,res) =>{
    res.render('login');
})
app.get('/logout', (req,res) =>{
    res.render('logout');
})
app.get('/register', (req,res) =>{
    res.render('register');
})



//end Render Pages


// to view add colors page


// when submit form to add to db and view homepage 


app.use('/', router)
//test connection server 
app.listen(config.serverPort, () =>{
    console.log('Server is working on Port : ', config.serverPort);
})