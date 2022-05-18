const { ObjectId } = require('mongoose').Types;
const { User, user } = require('../models');

module.exports = { 
    // get all users
    getUsers(req, res) {
        try{
            User.find()
            .then((users) =>  res.json(users))
        } catch(err){
            console.error(err);
            res.status(500).json(err);
        };
    },
    // get single user by id
    getAUser(req, res) {
        try{
            User.findOne({id:req.params.userId})
            .select('-__v')
            .then((user) => 
            !user 
                ? res.status(404).json({message: 'No user with this id'})
                : res.json(user)
        ); 
        } catch(err){
            console.error(err);
            res.status(500).json(err);
        };
    },
    // create a new user
    createUser(req, res) {
        try{
            User.create(req.body)
            .then((user) => res.json(user))
        } catch(err){
            console.error(err);
            res.status(500).json(err);
        };
    },
    // update users
    updateAUser(req, res) {
        try{
            User.findOneAndUpdate(
                {_id: req.params.userId },
                {$set: req.body },
                {runValidators: true, new: true }
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user with this id'})
                    : res.json(user)
            );
        } catch(err){
            console.error(err);
            res.status(500).json(err);
        };
    },
    // delete user
    deleteUser(req, res) {
        try{
            User.findOneAndDelete({_id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with this id' })
                    : res.json({ message: 'User successfully deleted' })
            );
        } catch(err){
            console.error(err);
            res.status(500).json(err);
        };
    },
    // add friend
    addFriend(req, res) {
        try{
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId} },
                { runValidators: true, new: true }
            )
            .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          );
        } catch(err){
            res.status(500).json(err);
        }
    },
    // delete friend 
    deleteFriend(req, res) {
        try{
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
              )
                .then((user) =>
                  !user
                    ? res.status(404).json({ message: 'No user found with that ID :(' })
                    : res.json(user)
                )
        } catch(err){
            res.status(500).json(err);
        }
    }
}