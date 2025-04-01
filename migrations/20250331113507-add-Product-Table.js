'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Products', {
      Id: Sequelize.INTEGER,
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      discount_type: {
        type: Sequelize.ENUM('percentage', 'fixed'),
        allowNull: false,
      },
      discount_amt: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_rate:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      tax_rate: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      tax_type: {
        type: Sequelize.ENUM('GST', 'SST'),
        allowNull: false,
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      uom:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      brand_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Products');
  }
};
