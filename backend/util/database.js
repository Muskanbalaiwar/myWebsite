const Sequelize =require('sequelize');

const sequelize=new Sequelize(process.env.DB_DBNAME,process.env.DB_ROLE,process.env.DB_PASSWORD,{
    dialect:process.env.DIALECT,
    host:process.env.DB_HOST
});

module.exports=sequelize;