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
    zipcode: Zipcode!
    isReserved: ID
  }

 type Reservation {
    _id: ID
    reservationDate: Date
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
    alldriveways: [Driveway]
    driveways(zip: Int!): [Driveway]
    user: User
    reservation(_id: ID!): Reservation
    checkout(products: [ID]!): Checkout
    checkoutIntent(products: [ID]!): CheckoutIntent
    drivewayDetail(_id: ID!): Driveway 
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addReservation(driveway: ID!): Reservation
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    postDriveway(address: String!, description: String, rules: String, image: String, price: Float!, availableDate: Date, startTime: String!, endTime: String!, zipcode: ID!): Driveway
  }
`;

module.exports = typeDefs;
