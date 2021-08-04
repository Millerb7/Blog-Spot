

/* 
    /           - all posts
    /post/:id   - single post
    /login      - login page
*/

const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
            model: User,
            attributes: ['name'],
        },
        {
            model: Comment,
            attributes: ['body'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

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
          attributes: ['name'],
        },
        {
            model: Comment,
            attributes: ['body'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('singlepost', {
      ...post,
      logged_in: req.session.logged_in,
      layout: "main.handlebars",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', !withAuth, (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render("login", { posts, layout: "main.handlebars" });
});

module.exports = router;