const router = require('express').Router();
const {} = require('../../controllers/thoughtControllers');

router
    .route('/')
    .get()
    .post()
    .put()
    .delete();

router
    .route('/:thoughtId')
    .get();

router
    .route('/:userId/friends/:friendId')
    .post()
    .delete();

module.exports = router;