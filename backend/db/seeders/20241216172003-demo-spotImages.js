'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_1280.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cdn.pixabay.com/photo/2022/01/26/04/47/house-6967908_1280.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.pixabay.com/photo/2017/11/16/19/29/cottage-2955582_1280.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://cdn.pixabay.com/photo/2017/11/25/15/48/house-2977085_1280.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://cdn.pixabay.com/photo/2016/01/23/21/58/new-1158139_1280.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.pixabay.com/photo/2016/08/16/03/39/home-1597079_1280.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cdn.pixabay.com/photo/2022/10/11/18/33/house-7514941_1280.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://cdn.pixabay.com/photo/2018/01/08/22/58/architecture-3070493_1280.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://cdn.pixabay.com/photo/2019/06/28/12/18/house-4304096_1280.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://cdn.pixabay.com/photo/2022/10/08/17/39/jungle-7507490_1280.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://cdn.pixabay.com/photo/2014/08/08/21/22/interior-design-413718_1280.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://cdn.pixabay.com/photo/2020/12/16/00/10/home-5835289_1280.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://cdn.pixabay.com/photo/2024/05/14/08/12/real-estate-8760600_1280.jpg",
        preview: false
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'SpotImages';
   const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image1 url', 'image2 url', 'image3 url'] }
    }, {}) 
  }
};
