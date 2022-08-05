import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Reservation from './pages/Reservation';

import Navbar from './components/Navbar';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

// Adds Post Driveway menu
import PostDriveway from './pages/PostDriveway';

/* Results Page */
import SearchResults from './pages/SearchResults';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/success"
                element={<Success />}
              />
              <Route
                path="/orderHistory"
                element={<OrderHistory />}
              />
              <Route
                path="/reservation"
                element={<Reservation />}
              />
              <Route
                path="/driveway/:id"
                element={<Detail />}
              />
              {/* Adds Post Driveway menu */}
              <Route
                path="/post"
                element={<PostDriveway />}
              />
              {/* Results Page */}
              <Route
                path="/results/:zipcode"
                element={<SearchResults />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
