const {Thought, User} = require('../models')

module.exports = { 
    // gets all thoughts
    getThoughts(req, res) {
        try{
            Thought.find()
            .then((thoughts) => res.json(thoughts));
        } catch(err) {
            res.status(500).json(err);
        };
    },
    // get a single thought by its id
    getAThought(req, res) {
        try{
            Thought.findOne({_id: req.params.thoughtId })
            .select('-__v')
            .then((thought) => 
                !thought 
                    ? res.status(404).json({message: 'No Thought with this id'})
                    : res.json(thought)
            ); 
        } catch(err) {
            res.status(500).json(err);
        };
    },
    // create a thought 
    createThought(req, res) {
        try{
            Thought.create(req.body)
            .then((thought) => res.json(thought));
        } catch(err) {
            res.status(500).json(err);
        };
    },
    // update a thought its id
    updateThought(req, res) {
        try{
            Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                {$set: req.body },
                {runValidators: true, new: true }
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'No Thought with this id'})
                    : res.json(thought)
            );
        } catch(err) {
            res.status(500).json(err);
        };
    },
    // delete thought through id 
    deleteThought(req, res) {
        try{
            Thought.findOneAndDelete({_id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No Thought with this id' })
                    : User.deleteMany({ _id: { $in: User.thoughts } })
            );
        } catch(err) {
            res.status(500).json(err);
        };
    }
}