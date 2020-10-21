const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
          },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
          },
          users: async () => {
            return User.find()
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
          },
          // get a user by username
          user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('friends')
              .populate('thoughts');
          },

    }
};

// resolvers can accept:
// parent - holds the the reference to the resolver that executed the nested resolver function
// args - object of all values passed into query/mutation
// context - applies when needing same data across all resolves
// info - extra information about operator current state
// More Info: 
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments

module.exports = resolvers;