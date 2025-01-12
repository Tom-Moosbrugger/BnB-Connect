'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await User.bulkCreate([
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      firstName: 'John',
      lastName: 'Doe',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user1@user.io',
      username: 'pasquatch99',
      firstName: 'Vinnie',
      lastName: 'Pasquantino',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user2@user.io',
      username: 'silentassassin43',
      firstName: 'Wade',
      lastName: 'Davis',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      email: 'user3@user.io',
      username: 'kersh22',
      firstName: 'Clayton',
      lastName: 'Kershaw',
      hashedPassword: bcrypt.hashSync('password3')
    },
   ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {}) 
  }
};
