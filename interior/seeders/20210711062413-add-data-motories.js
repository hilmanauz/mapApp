'use strict';

const motors = [
  {
    nama: 'Herdy',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'Maman',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    nama: 'Hilman',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nama: 'Mahdy',
    createdAt: new Date(),
    updatedAt: new Date()
  },
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
    await queryInterface.bulkInsert('Motors', motors, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Motors', null, {})
  }
};
