import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_CHECKOUT_INTENT = gql`
  query getCheckoutIntent($products: [ID]!) {
    checkoutIntent(products: $products) {
      clientSecret
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

// Results Page
export const QUERY_DRIVEWAYS = gql`
  query serchDriveways($zip: Int!) {
    driveways(zip: $zip) {
      _id
      address
      description
      rules
      image
      price
      availableDate
      startTime
      endTime
    }
  }
`;

// Details Page
export const QUERY_SINGLE_DRIVEWAY = gql`
  query searchSingleDriveway($_id: ID!) {
    drivewayDetail(_id: $_id) {
      _id
      address
      description
      rules
      image
      price
      availableDate
      startTime
      endTime
      zipcode {
        _id
        zip
        lat
        lng
        city
        state_id
      }
    }
  }
`;
