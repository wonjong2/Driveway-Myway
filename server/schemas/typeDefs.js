const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Zipcode {
    _id: ID
    zip: Int!
    lat: Float!
    lng: Float!
    city: String
    state_id: String
    state_name: String
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
    isReserved: User
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
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
    mydriveways: [Driveway]
    createddriveways: [Driveway]
    driveways(zip: Int!): [Driveway]
    user: User
    reservation(_id: ID!): Reservation
    checkout(products: [ID]!): Checkout
    checkoutIntent(products: [ID]!): CheckoutIntent
    drivewayDetail(_id: ID!): Driveway 
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addReservation(driveway: ID!): Reservation
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    deleteDriveway(id: ID!): Boolean
    updateDriveway(
    _id: ID!
      address: String!,
      description: String,
      rules: String,
      image: String,
      price: Float,
      availableDate: Date,
      startTime: String,
      endTime: String
      zipcode: Int
    ): Driveway
    postDriveway(address: String!, description: String, rules: String, image: String, price: Float!, availableDate: Date, startTime: String!, endTime: String!, zipcode: ID!): Driveway
    addComment(drivewayId: ID!, commentText: String!): Driveway
  }
`;

module.exports = typeDefs;
