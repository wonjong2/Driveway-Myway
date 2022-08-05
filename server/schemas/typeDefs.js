const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
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

  type Driveway {
    _id: ID
    address: String!
    description: String
    rules: String
    image: String
    price: Float!
    availableDate: Date
    startTime: String!
    endTime: String!
    zipcode: Zipcode!
  }

  type Zipcode {
    _id: ID
    zip: Int!
    lat: Float!
    lng: Float!
    city: String
    state_id: String
    state_name: String
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    checkoutIntent(products: [ID]!): CheckoutIntent
    driveways(zip: Int!): [Driveway]
    drivewayDetail(_id: ID!): Driveway 
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    postDriveway(address: String!, description: String, rules: String, image: String, price: Float!, availableDate: Date, startTime: String!, endTime: String!, zipcode: ID!): Driveway
  }
`;

module.exports = typeDefs;
