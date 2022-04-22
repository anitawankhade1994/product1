const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
const mysql = require('mysql');
var session = require('express-session');
const ejs = require('ejs');
const { get } = require('http');
 var http = require('http');
 var fs = require('fs');
const route = require('color-convert/route');
const { outer } = require('express');
const ejsLint = require('ejs-lint');



router.get('/',function (req,res){
res.sendFile(path.join(__dirname+ '/productr.html'));
});

router.get('/productr.html',function (req,res){
  res.sendFile(path.join(__dirname+ '/productr.html'));
  });
  router.get('/userlogin.html',function (req,res){
    res.sendFile(path.join(__dirname+ '/userlogin.html'));
    });
  router.get('/adminlogin.html',function (req,res){
    res.sendFile(path.join(__dirname+ '/adminlogin.html'));
    });
      router.get('/contact1.html',function (req,res){
        res.sendFile(path.join(__dirname+ '/contact1.html'));
        });
        router.get('/userindex.ejs',function (req,res){
          res.sendFile(path.join(__dirname+ '/userindex.ejs'));
          });
        var  publicDir = require('path').join(__dirname,'/public');
        http.createServer(function (req,res){
        fs.readFile('/productr.html',function (err,html){
        res.writeHead(200,{'Content-Type': 'text/html'});
       res.write(html);
       res.end();

    });
    })
    http.createServer(function (req,res){
      fs.readFile('/adminlogin.html',function (err,html){
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write(html);
        res.end();
  
      });
  })

http.createServer(function (req,res){
  fs.readFile('/userlogin.html',function (err,html){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(html);
    res.end();

  });
})



http.createServer(function (req,res){
  fs.readFile('/contact1.html',function (err,html){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(html);
    res.end();

  });
})

http.createServer(function (req,res){
  fs.readFile('/userindex.ejs',function (err,ejs){
    res.writeHead(200,{'Content-Type': 'text/ejs'});
    res.write(ejs);
    res.end();

  });
})




  app.use('/',router);
  app.listen(process.env.port || 5000);
  console.log("runing at port 5000");

let connection = mysql.createConnection({
  host : "localhost",
  user: "root",
  password: "9561786622",
  database: "product1"
});

connection.connect(function(err){
  if(err) console.log(err);
  
  console.log("connection successfully");
});

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
//app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//app.use(express.static(path.join(__dirname, 'public')));

app.get('/userindex',(req,res)=>{
   let sql = "SELECT * FROM product2";
   let qry = connection.query(sql,(err,rows)=>{
       if(err) console.log(err);
       res.render("user_index.ejs",{
           title : "prod"
           ,user : rows
       });
   });
 });


 app.get('/add',(req,res)=>{
     res.render("user_add.ejs",{
     title : "Add User"
     });
 });
 


 app.post('/save',(req,res)=>{
   let data ={productId:req.body.productId,  productName:req.body.productName, categoryName:req.body.categoryName, categoryId:req.body.categoryId}
   let sql ="INSERT INTO product2 SET ?";
   let qry = connection.query(sql,data,(err,rows)=>{
     if(err)console.log(err);
     res.render('/user_index.ejs')
   }); 
 
 });


 app.get("/edit/:productId",(req,res)=>{
   const userrNo = req.params.productId;
    let sql = "SELECT * FROM product2 WHERE productId=?";
    let qry = connection.query(sql,[userrNo],(err,rows)=>{
          if(err) console.log(err);
       res.render("user_edit.ejs",{
              title : "Edit User",
              user: rows[0]
          });
   });
   });

  
 app.post("/save_edit",(req,res)=>{ 
   let sql = "UPDATE product2  SET productName = ? ,categoryName = ? ,categoryId= ? WHERE productId = ?";
   let qry = connection.query(sql,[req.body.productId,req.body.productName, req.body.categoryName, req.body.categoryId],(err,rows)=>{
       if(err) console.log(err);
       res.redirect('/userindex');
 });
 });


 app.get("/delete/:productId" , (req, res )=>{
  let sql = "DELETE FROM product2 WHERE productId= ?";
  let qry = connection.query(sql,[req.params.productId], (err,rows)=>{
    if (err) throw err;
    res.redirect('/userindex');
  })
})
 