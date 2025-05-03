const {DataTypes, Model} = require('sequelize');
module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User'
  });
  return User;
}

  
