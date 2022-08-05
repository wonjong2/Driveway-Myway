const { AuthenticationError } = require('apollo-server-express');
const { User, Reservation, Driveway, Zipcode } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// /* Adds Post Driveway menu */
const { GraphQLDate } = require('graphql-iso-date');

const resolvers = {
  Query: {
    zipcodes: async () => {
      return await Zipcode.find();s
    },

    alldriveways: async (parent) => {
      
      return await Driveway.find().populate('zipcode');
    },
    // Results Page
    driveways: async (parent, { zip }) => {
      const zipcodeId = await Zipcode.findOne({ zip });
      return await Driveway.find({ zipcode: zipcodeId })
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'reservations.driveway',
          populate: 'zipcode'
        });

        user.reservations.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    reservation: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'reservations.driveway',
          populate: 'zipcode'
        });

        return user.reservations.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    checkoutIntent: async (parent, args, context) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1500,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return {
        clientSecret: paymentIntent.client_secret,
      }
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
    postDriveway: async (parent, { address, description, rules, image, price, availableDate, startTime, endTime, zipcode }, context) => {
      const driveway = await Driveway.create({ address, description, rules, image, price, availableDate, startTime, endTime, zipcode });
      console.log("Driveway : ", driveway);
      return driveway._id;
    },
  },
  Date: GraphQLDate
};

module.exports = resolvers;
