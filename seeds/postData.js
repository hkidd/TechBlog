const { Posts } = require('../models');

const postdata = [
  {
    user: 'hkidd',
    posting_date: 'August 2, 2021 04:30:00',
    text: 'This homework should be postponed until after our project',
  },
];

const seedPosts = () => Posts.bulkCreate(postdata);

module.exports = seedPosts;
