const router = require('express').Router();
const {} = require('../../controllers/userControllers');

router
    .route('/')
    .get()
    .post()
    .put()
    .delete();

router
    .route('/:userId')
    .get();

router
    .route('/:userId/friends/:friendId')
    .post()
    .delete();

module.exports = router;