const { Comments } = require('../models');

const commentdata = [
  {
    user: "randomUser",
    post_date: 'March 30, 2018',
    text: "This is an excellent idea!"
  }
];

const seedComments = () => Comments.bulkCreate(commentdata);

module.exports = seedComments;
