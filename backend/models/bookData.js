const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Data = sequelize.define('BookData', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,   
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true, // You can set this to true or false based on whether you want it to be nullable
  },
  rupees: {
    type: Sequelize.DECIMAL(10, 2), // Use DECIMAL for currency or precise numbers
    allowNull: false,   
  },
}, {
  timestamps: true,  // Enable `createdAt` and `updatedAt` by default
});

module.exports = Data;
