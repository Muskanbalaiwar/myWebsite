const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors=require('cors');
require('dotenv').config();
const dotenv=require('dotenv');
dotenv.config();
const sequelize=require('./util/database');

const sign=require('./routes/sign')
const item = require('./routes/item')
const bookData_Table=require('./models/bookData')
const users_Table = require('./models/users')
app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sign)
app.use(item)

users_Table.hasMany(bookData_Table)
bookData_Table.belongsTo(users_Table)
sequelize.sync()
.then(res=>{
    console.log("res");
})
.catch(err=>{
    console.log(err);
})

const port = process.env.PORT||3000;
app.listen(port ,()=>{
    console.log("server is started")
})