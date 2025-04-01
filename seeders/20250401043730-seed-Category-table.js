'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('category', [
      { id: 1, category_name: 'Food & Beverages' },
      { id: 2, category_name: 'Clothing & Apparel' },
      { id: 3, category_name: 'Electronics & Gadgets' },
      { id: 4, category_name: 'Home & Living' },
      { id: 5, category_name: 'Health & Beauty' },
      { id: 6, category_name: 'Sports & Outdoors' },
      { id: 7, category_name: 'Automotive & Accessories' },
      { id: 8, category_name: 'Books & Stationery' },
      { id: 9, category_name: 'Toys & Games' },
      { id: 10, category_name: 'Furniture & Decor' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
