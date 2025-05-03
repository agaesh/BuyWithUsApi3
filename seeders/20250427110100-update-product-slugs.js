'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInse rt('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const products = await queryInterface.sequelize.query(
      `SELECT id, product_name FROM Products;`
    );

    const updateProducts = products[0].map(product => {
      const slug = product.product_name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Trim hyphens from start and end

      return {
        id: product.id,
        slug: slug,
      };
    });

    await Promise.all(
      updateProducts.map(product => {
        return queryInterface.bulkUpdate(
          'Products',
          { slug: product.slug },
          { id: product.id }
        );
      })
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkUpdate(
      'Products',
      { slug: null },
      {}
    );

  }
};
