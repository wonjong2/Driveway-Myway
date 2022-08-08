import { gql } from '@apollo/client';

export const QUERY_ALL_DRIVEWAYS = gql`
query Alldriveways {
  alldriveways {
    address
    _id
    description
    zipcode {
      _id
      zip
    }
    rules
    image
    price
    availableDate
    startTime
    endTime
    isReserved {
      _id
    }
  }
}
`;

export const QUERY_MY_DRIVEWAYS = gql`
query mydriveways {
  mydriveways {
    address
    _id
    description
    zipcode {
      _id
    }
    rules
    image
    price
    availableDate
    startTime
    endTime
    isReserved {
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

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      _id
      email
    }
  }
`;

export const QUERY_CREATED_DRIVEWAYS = gql`
  {
    createddriveways {
      _id
      address
      description
      rules
      image
      price
      availableDate
      startTime
      endTime
      isReserved {
        _id
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
      isReserved {
        _id
      }
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
