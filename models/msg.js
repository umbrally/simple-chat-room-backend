'use strict';
module.exports = (sequelize, DataTypes) => {
  const Msg = sequelize.define('Msg', {
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {});
  Msg.associate = function (models) {
    Msg.belongsTo(models.User)
  };
  return Msg;
};