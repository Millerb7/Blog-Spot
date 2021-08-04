

/* 
    /           - users profile
    /new        - new post
    /edit/:id   - edit post
*/
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// opens the homeadmin handlebars view
router.get('/', withAuth, async (req,res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: {
                model: User,
                attributes: ['username'],
            },
        });
        if(postData) {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.status(200).render('homeadmin', { posts, logged_in: req.session.logged_in, layout: "dashboard.handlebars"  });
        } else {
            res.status(400).json('No posts');
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// opens the new post handlebars view to create a new post
router.get('/new', async (req,res) => {
    try {
        res.status(200).render('newpost', { logged_in: req.session.logged_in, layout: "dashboard.handlebars" });
    } catch(err) {
        res.status(500).json(err);
    }
});

// opens the editpost handlebars view to edit any post by id
router.get('/edit/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['body'],
                },
            ]   
        });

        if(postData) {  
            const post = postData.get({ plain: true });
            res.status(200).render('editpost', { post, logged_in: req.session.logged_in, layout: "dashboard.handlebars" } );
        } else {
            res.status(400).json('Post could not be found!');
        }
        
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;