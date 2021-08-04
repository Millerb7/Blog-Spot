

/* 
    /
*/

const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.seesion.post_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;