import { gql } from '@apollo/client';

export const QUERY_ALL_DRIVEWAYS = gql`
  {
    alldriveways {
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


export const QUERY_ZIPCODE = gql`
query getZipcode($zip: Int!) {
  zipcode(zip: $zip) {
    _id
  }
}
`;
