const { DataTypes } = require("sequelize")

const sequelize = require("../sequelize")

const Lodging = sequelize.define('lodging', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING(2), allowNull: false },
  zip: { type: DataTypes.STRING(5), allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
})

module.exports = Lodging
