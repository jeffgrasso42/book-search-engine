const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

module.exports = {
  Query: {
    me: async (parent, args, context) => {
      return await User.findById(context.user._id);
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to preform this action');
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    },

    deleteBook: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to preform this action');
      }
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  },
};
