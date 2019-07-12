const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { JWTSECRET } = require("../../Config/app");
const User = require("../../Models/User");

module.exports = {
  Mutation: {
    //  _ parent -> gives result from last step (used in case of multiple resolvers)
    // args -> arguments / inputs
    // info -> general info about metadata which we dont need

    async registerUser(
      _,
      {
        input: { username, email, password, password_confirmation }
      },
      context,
      info
    ) {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }]
      });
      if (existingUser) {
        throw new UserInputError("Form has some errors.", {
          errors: {
            username: "Please provide unique email / username."
          }
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username
        },
        JWTSECRET,
        {
          expiresIn: "1h"
        }
      );

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
