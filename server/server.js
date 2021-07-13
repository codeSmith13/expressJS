const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser')
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
// middleware logger
app.use((req, res, next)=> {
   let name = req.body.name;
   let email = req.body.email;
   fs.appendFileSync("data.json", `Name:${name} Email:${email}\n`);
   next();
   console.log(req.url);
});

app.post('/contact-form', (req, res)=>{
   console.log(req.body.email);
   console.log(req.body.name);
   let name = req.body.name;
   let email = req.body.email;
   res.send(`Thank you for submitting! ${name}  Email:${email}`);
})
app.post("./data.json", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  fs.writeFileSync("/data", `${name}${email}\n`);
  res.send(`"hank you for submitting"${name}`);
});



// app.get('/', (req, res) => {
// res.send('Hello world!');
// });


app.use(express.static(path.join(__dirname, '../public')));


// app.get('/order/:id',(req, res) =>{
// let id = req.params.id;
// let email = req.query.email;
// res.send(`your name is ${id}and your email is ${email}`);
// });



app.listen(3000);
