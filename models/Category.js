const { DataTypes, Model } = require('sequelize');
// Adjust the path as necessary
module.exports = (sequelize) => {
  class Category extends Model {
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,  // Pass the sequelize instance
      modelName: 'Category',  // Model name
      tableName: 'Category',  // Table name in the database
      timestamps: true,  // Sequelize will add createdAt and updatedAt columns automatically
    }
  );
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
    });
  }

  return Category;
};
