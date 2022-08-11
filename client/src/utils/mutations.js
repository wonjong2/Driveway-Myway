import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_RESERVATION = gql`
  mutation addReservation($driveway: ID!) {
    addReservation(driveway: $driveway) {
      _id
    reservationDate
    }
  }
`;

export const DELETE_DRIVEWAY = gql`
  mutation deleteDriveway($id: ID!) {
    deleteDriveway(id: $id)
  }
`;

export const UPDATE_DRIVEWAY = gql`
  mutation updateDriveway(
    $_id: ID!
    $address: String!
    $description: String
    $rules: String
    $image: String
    $price: Float!
    $availableDate: Date
    $startTime: String!
    $endTime: String!
    $zipcode: Int
  ) {
    updateDriveway(
      _id: $_id
      address: $address
      description: $description
      rules: $rules
      image: $image
      price: $price
      availableDate: $availableDate
      startTime: $startTime
      endTime: $endTime
      zipcode: $zipcode
    ) {
        _id
      }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// /* Adds Post Driveway menu */
export const POST_DRIVEWAY = gql`
  mutation postDriveway(
    $address: String!
    $description: String
    $rules: String
    $image: String
    $price: Float!
    $availableDate: Date
    $startTime: String!
    $endTime: String!
    $zipcode: ID!
  ) {
    postDriveway(
      address: $address
      description: $description
      rules: $rules
      image: $image
      price: $price
      availableDate: $availableDate
      startTime: $startTime
      endTime: $endTime
      zipcode: $zipcode
    ) {
      _id
    }
  }
`;
// Comments for Driveway Details Page
export const ADD_COMMENT = gql`
  mutation addComment($drivewayId: ID!, $commentText: String!) {
    addComment(drivewayId: $drivewayId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
