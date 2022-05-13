const { Schema, model } = require('mongoose');
const thoughts = require('./Thought.js')

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
        unique: true
      },
      thoughts: {thoughts},
      friends: [userSchema],
    },
    {
      toJSON: {
        virtuals: true,
      }
    }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


  
const User = model('user', userSchema);
  
module.exports = User;
  