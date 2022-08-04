const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Zipcode {
    _id: ID
    zip: Int!
    lat: Float!
    lon: Float!
  }

  type Driveway {
    _id: ID
    address: String!
    description: String
    rules: String
    image: String
    price: Float
    availableDate: Date
    startTime: String
    endTime: String
    zipcode: Zipcode
  }

 type Reservation {
    _id: ID
    reservationDate: Data
    driveway: Driveway
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    reservations: [Reservation]
  }

  type Checkout {
    session: ID
  }

  type CheckoutIntent {
    clientSecret: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    zipcodes: [Zipcode]
    driveways(zipcode: zip): [Driveway]
    driveway(_id: ID!): Driveway
    user: User
    reservation(_id: ID!): reservation
    checkout(products: [ID]!): Checkout
    checkoutIntent(products: [ID]!): CheckoutIntent
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addReservation(driveway: ID!): Reservation
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    postDriveway(address: String!, description: String, rules: String, image: String, price: Int!, availableDate: Date, startTime: String!, endTime: String!, zipcode: ID!): Driveway
  }
`;

module.exports = typeDefs;
