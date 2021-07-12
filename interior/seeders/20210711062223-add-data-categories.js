'use strict';

const Kategoris = [
  {
    nama: 'Retail',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'Grosir',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    nama: 'Semi-Grosir',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Kategoris', Kategoris, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Kategoris', null, {})
  }
};
