

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
    User.findByPk(req.session.user_id).then((res) => {console.log(res.username);});
      const postData = await Post.create({
          ...req.body,
          user_id: req.session.user_id
      });

      req.session.save(() => {
        req.session.logged_in = true;
        req.session.post_id = postData.id;
  
        res.status(200).json(postData);
      });
    } catch (err) {
      res.status(404).json(err);
    }
});

router.put('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.update(
            {where: {id: req.params.id}},
            {body: req.body.body},
            {title: req.body.title}
        );

        if(postData) {
            res.status(200).json('data updated');
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
            user_id: req.session.user_id,
          },
        });
    
        if (postData) {
            res.status(200).json(projectData);
        } else {
            res.status(404).json({ message: 'No project found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;