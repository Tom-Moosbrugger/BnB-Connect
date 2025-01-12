'use strict';

const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "450 Mulholland Drive",
        city: "Los Angeles",
        state: "CA",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Modern Bungalow",
        description: "This sleek, modern house in Los Angeles boasts open-concept living with floor-to-ceiling windows, a gourmet kitchen, and stylish decor. Relax by the pool or enjoy panoramic city views from the rooftop. Just minutes from trendy restaurants and shops, it's a true urban oasis.",
        price: 400,
      },
      {
        ownerId: 1,
        address: "3600 Belmont Drive",
        city: "Hood River",
        state: "OR",
        country: "United States of America",
        lat: 38.7645358,
        lng: -142.4730327,
        name: "Cozy Cabin",
        description: "Tucked away in a secluded forest, this charming cabin offers the perfect retreat from the hustle and bustle of daily life. Surrounded by towering trees and the sounds of nature, the cabin features a cozy living room with a stone fireplace, a fully equipped kitchen, and two bedrooms with comfortable queen-sized beds. Step outside onto the private deck to enjoy your morning coffee while listening to the birds chirp and the rustling of the leaves. Whether you're hiking the nearby trails, stargazing under the clear night sky, or simply unwinding by the fire, this cabin is the ideal escape for nature lovers seeking peace and tranquility.",
        price: 200,
      },
      {
        ownerId: 2,
        address: "900 Oasis Drive",
        city: "Chapel Hill",
        state: "NC",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "Rural Cottage",
        description: "Nestled in the countryside, this rustic cottage offers a cozy living room, fully stocked kitchen, and two comfy bedrooms. Enjoy the peaceful garden, nearby hiking trails, and the charm of rural life. A perfect escape for nature lovers.",
        price: 175,
      },
      {
        ownerId: 2,
        address: "12 Sandalwood Drive",
        city: "Burlington",
        state: "VT",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "Yellow House",
        description: "This charming yellow house in Burlington combines classic elegance with modern amenities. Enjoy spacious rooms, a lovely garden, and easy access to downtown's shops, restaurants, and Lake Champlain views.",
        price: 200,
      },
      {
        ownerId: 3,
        address: "7500 Peninsula Drive",
        city: "Traverse City",
        state: "MI",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "Lake Retreat",
        description: "This stunning lake house sits right on the water, offering breathtaking views from every room. With a spacious deck, cozy living areas, and a fully equipped kitchen, it’s perfect for swimming, fishing, or simply relaxing by the water’s edge. A serene lakeside retreat.",
        price: 320,
      },
      {
        ownerId: 3,
        address: "500 Gilbert Street",
        city: "New Haven",
        state: "CT",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "New Heaven",
        description: "This charming suburban home in New Haven features a spacious living room, a bright kitchen, and three cozy bedrooms. Enjoy the private backyard, perfect for outdoor gatherings, and take advantage of the quiet neighborhood, all while being close to downtown and local parks.",
        price: 180,
      },
      {
        ownerId: 4,
        address: "2010 Norwood Ave",
        city: "Boulder",
        state: "CO",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "Boulder Bungalow",
        description: "This quaint brick cottage in Boulder offers a cozy retreat with rustic charm. Featuring a warm living room, a fully equipped kitchen, and two bedrooms, it’s perfect for relaxing after a day of hiking. Enjoy mountain views from the backyard, just minutes from downtown.",
        price: 250,
      },
      {
        ownerId: 4,
        address: "480 Chimney Lamp Road",
        city: "Laramie",
        state: "WY",
        country: "United States of America",
        lat: 79.7645358,
        lng: -100.4730327,
        name: "Fairytale Farm House",
        description: "This secluded farmhouse offers peace and tranquility, surrounded by sprawling fields and nature. With a cozy living room, a rustic kitchen, and three comfortable bedrooms, it’s the perfect retreat. Enjoy quiet walks, stargazing, and the charm of country living.",
        price: 250,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {}) 
  }
};
