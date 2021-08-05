

/* 
    /           - all posts
    /post/:id   - single post
    /login      - login page
*/

const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
            model: User,
        },
        {
            model: Comment,
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      layout: "main.handlebars",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
            model: Comment,
            include: {
              model: User,
              attributes: ['username','id'],
            },
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('singlepost', {
      ...post,
      is_owner: req.session.user_id === post.user_id,
      logged_in: req.session.logged_in,
      layout: "main.handlebars",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("login", { layout: "main.handlebars" });
});

module.exports = router;