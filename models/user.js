'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: { type: DataTypes.STRING, defaultValue: 'https://picsum.photos/50' }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Msg)
  };
  return User;
};