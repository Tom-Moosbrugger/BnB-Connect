'use strict';


const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 3,
        review: "Good spot with great amenities. Could use more pillows and blankets, though.",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 4,
        review: "Comfortable and stylish. A bit small for the price, but overall good value.",
        stars: 4,
      },
      {
        userId: 1,
        spotId: 5,
        review: "Great location, cozy space. Only downside was the noisy street at night.",
        stars: 3,
      },
      {
        userId: 1,
        spotId: 6,
        review: "Nice place, but the AC did not work well. Was a bit too warm for my stay.",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 1,
        review: "Decent place, but it was not as described in the listing. Expected more space.",
        stars: 3,
      },
      {
        userId: 2,
        spotId: 2,
        review: "Clean and well-located. Parking was tricky, but not a dealbreaker for us.",
        stars: 4,
      },
      {
        userId: 2,
        spotId: 5,
        review: "Disappointing. The place was not cleaned properly and had a musty smell.",
        stars: 2,
      },
      {
        userId: 2,
        spotId: 6,
        review: "Cozy and quiet spot. Could use better lighting in the bathroom, but great overall",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 1,
        review: "Great location, but the bathroom could use some updates. Still, decent for the price.",
        stars: 3,
      },
      {
        userId: 3,
        spotId: 2,
        review: "Perfect stay! Super clean and quiet. The host made check-in a breeze. Would book again!",
        stars: 5,
      },
      {
        userId: 3,
        spotId: 3,
        review: "Nice place, but there was construction nearby. It was a bit noisy during the day.",
        stars: 2,
      },
      {
        userId: 3,
        spotId: 4,
        review: "Lovely home, very peaceful. A bit far from downtown, but worth it for the quiet atmosphere.",
        stars: 4,
      },
      {
        userId: 4,
        spotId: 1,
        review: "Fantastic place! Very clean, comfy, and the host was super helpful. Highly recommend!",
        stars: 5,
      },
      {
        userId: 4,
        spotId: 2,
        review: "Good location, but the place was smaller than expected. Could use more kitchen supplies.",
        stars: 3,
      },
      {
        userId: 4,
        spotId: 3,
        review: "Overall, a great stay. Just wish the check-in time was a little earlier.",
        stars: 4,
      },
      {
        userId: 4,
        spotId: 4,
        review: "Nice, but a bit outdated. Would have preferred more modern amenities for the price.",
        stars: 3,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {}) 
  }
};
