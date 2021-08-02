const router = require("express").Router();
const { Posts, Comments } = require("../models");
// TODO: Import the custom middleware
const withAuth = require("../utils/auth.js");

// GET all galleries for homepage
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

    const posts = dbPostsData.map((Posts) =>
      posts.get({ plain: true })
    );

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Posts
// TODO: Replace the logic below with the custom middleware
router.get("/Posts/:id", withAuth, async (req, res) => {
  // If the user is logged in, allow them to view the Posts
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
    res.render("Posts", { Posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Comments
// TODO: Replace the logic below with the custom middleware
router.get("/Comments/:id", withAuth, async (req, res) => {
    // If the user is logged in, allow them to view the Comments
    try {
      const dbCommentsData = await Comments.findByPk(req.params.id);

      const Comments = dbCommentsData.get({ plain: true });

      res.render("Comments", { Comments, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
