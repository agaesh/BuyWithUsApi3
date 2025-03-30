'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
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
    modelName: 'Users'
  });

  User.validate = async function (data, res) {
      const { firstname, lastname, email, password } = data;
      
      if (!firstname || !lastname || !email || !password) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      // Validate Email Format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      // Check if Email is Already in Use
      const existingUser = await User.findOne({ where: { email }, attributes: ['id', 'firstname', 'lastname', 'email', 'password'] });
      if (existingUser) {
          return res.status(400).json({ success: false, message: 'Email already exists' });
      }

      return { success: true, message: 'Validation passed' };
  }

  return User;
}; 