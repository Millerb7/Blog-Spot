

/* 
    /
    /:id
    /:id
*/
const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
          title: req.body.title,
          body: req.body.body,
          user_id: req.session.user_id
      });

      req.session.save(() => {
        req.session.logged_in = true;

        res.status(200).json(postData);
      });
    } catch (err) {
      res.status(404).json(err);
    }
});

router.put('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.update(
            {
                body: req.body.body,
                title: req.body.title,
                user_id: req.session.user_id,
            },
            {where: {id: req.params.id}},
        );

        if(postData) {
            res.status(200).json(postData);
        } else {
            res.status(404).json('data incorrect');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.destroy({
          where: {
            id: req.params.id,
          },
        });
    
        if (postData) {
            res.status(200).json(postData);
        } else {
            res.status(404).json({ message: 'No project found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;