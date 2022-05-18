const router = require('express').Router();
const {
    getUsers,
    getAUser,
    createUser,
    updateAUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers');

router
    .route('/')
    .get(getUsers)
    .post(createUser)

router
    .route('/:userId')
    .get(getAUser)
    .put(updateAUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;