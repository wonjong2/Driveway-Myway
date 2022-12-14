const { AuthenticationError } = require("apollo-server-express");
const { User, Reservation, Driveway, Zipcode } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    zipcodes: async () => {
      return await Zipcode.find();
    },

    alldriveways: async (parent) => {
      return await Driveway.find({
        isReserved: {
          $eq: null,
        },
      }).sort({createdAt: -1}).populate(['zipcode', 'isReserved']);
    },
    mydriveways: async (parent, args, context) => {
      if (context.user) {
        return await Driveway.find({
          isReserved: {
            $eq: context.user._id,
          },
        }).populate(["zipcode", "isReserved"]);
      }
      throw new AuthenticationError("Not logged in");
    },
    createddriveways: async (parent, args, context) => {
      if (context.user) {
        return await Driveway.find({
          createdBy: {
            $eq: context.user._id,
          },
        }).populate(["zipcode", "isReserved"]);
      }
      throw new AuthenticationError("Not logged in");
    },
    // Results Page
    driveways: async (parent, { zip }) => {
      const zipcodeId = await Zipcode.findOne({ zip });
      return await Driveway.find({ zipcode: zipcodeId });
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "reservations.driveway",
          populate: "zipcode",
        });

        user.reservations.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    reservation: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "reservations.driveway",
          populate: ["zipcode"],
        });

        return user.reservations.id(_id);
      }

      throw new AuthenticationError("Not logged in");
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
      };
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
    drivewayDetail: async (parent, { _id }) => {
      return await Driveway.findById(_id).populate("zipcode");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addReservation: async (parent, args, context) => {
      if (context.user) {
        return await Driveway.findByIdAndUpdate(args.driveway, {
          isReserved: context.user._id,
        });
      }
      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    postDriveway: async (
      parent,
      {
        address,
        description,
        rules,
        image,
        price,
        availableDate,
        startTime,
        endTime,
        zipcode,
      },
      context
    ) => {
      const zipcodeId = await Zipcode.findOne({ zip: zipcode });
      const driveway = await Driveway.create({
        address,
        description,
        rules,
        image,
        price,
        availableDate,
        startTime,
        endTime,
        zipcode: zipcodeId,
        createdBy: context?.user?._id,
      });
      console.log("Driveway : ", driveway);
      return driveway._id;
    },
    deleteDriveway: async (parent, args, context) => {
      if (context.user) {
        await Driveway.deleteOne({
          createdBy: context.user._id,
          _id: args.id,
        });
        return true;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateDriveway: async (parent, args, context) => {
      if (context.user) {
        const zipcodeId = await Zipcode.findOne({ zip: args.zipcode });
        await Driveway.findOneAndUpdate({
          createdBy: context.user._id,
          _id: args._id,
        }, {
          ...args,
          zipcode: zipcodeId,
          createdBy: context.user._id
        });
        return true;
      }
    },
    addComment: async (parent, { drivewayId, commentText }) => {
      return Driveway.findOneAndUpdate(
        { _id: drivewayId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
        }
      );
    },
  },
};

module.exports = resolvers;
