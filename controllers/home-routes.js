const router = require("express").Router();
const { Posts, Comments } = require("../models");
// TODO: Import the custom middleware
const withAuth = require("../utils/auth.js");

// GET all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostsData = await Posts.findAll({
      include: [
        {
          model: Comments,
          attributes: ["user", "post_date", "text"],
        },
      ],
    });

    const postData = dbPostsData.map((posts) =>
      posts.get({ plain: true })
    );

    res.render("homepage", {
      postData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Post
router.get("/Posts/:id", withAuth, async (req, res) => {
  // If the user is logged in, allow them to view the Post
  try {
    const dbPostsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ["user", "post_date", "text"],
        },
      ],
    });
    const Posts = dbPostsData.get({ plain: true });
    res.render("posts", { 
      Posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/users/addpost", async (req, res) => {
  // create a new post
  try {
    const postData = await Posts.create({
      user: req.body.user,
      text: req.body.text,
      posting_date: req.body.posting_date
    });
    // if the post is successfully created, the new response will be returned as json
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET one Comments
// TODO: Replace the logic below with the custom middleware
router.get("/Comments/:id", withAuth, async (req, res) => {
    // If the user is logged in, allow them to view the Comments
    try {
      const dbCommentsData = await Comments.findByPk(req.params.id);

      const Comments = dbCommentsData.get({ plain: true });

      res.render("comments", { Comments, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'signup' template
  res.render('signup');
});

// Add new post route
router.get('/newpost', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  // Otherwise, render the 'signup' template
  res.render('newpost');
});

module.exports = router;
