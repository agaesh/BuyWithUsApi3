const { DataTypes, Model } = require('sequelize');
module.exports = (sequelize) => {
  class Product extends Model {}
  
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount_type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        allowNull: false,
      },
      discount_amt: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_type: {
        type: DataTypes.ENUM('GST', 'SST'),
        allowNull: false,
      },
      tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      uom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: { // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category', // Table name of the related model
          key: 'id', // Primary key in the related model
        },
      },
    },
    {
      sequelize, // Pass the sequelize instance
      modelName: 'Product', // Model name
      tableName: 'Products', // Table name in the database
      timestamps: true, // Sequelize automatically adds createdAt and updatedAt columns
    }
    
  );
  Product.associate = function(models) {
    Product.belongsTo(models.Category, { 
      foreignKey: 'categoryId',
    });
  };

  return Product;
};
