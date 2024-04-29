const { DataTypes } = require("sequelize")

const sequelize = require("../sequelize")

const Lodging = require("./lodging")

const Reservation = sequelize.define("reservation", {
  start: { type: DataTypes.DATE, allowNull: false },
  end: { type: DataTypes.DATE, allowNull: false },
})

Lodging.hasMany(Reservation, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
Reservation.belongsTo(Lodging)

module.exports = Reservation
