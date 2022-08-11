import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

//importing icons
import {Search, Key, ClockHistory, Person, Lock, Calendar2Plus} from 'react-bootstrap-icons'

import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import SignUpForm from '../Signup';
import LoginForm from '../Login';


function AppNavbar() {

  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand >
            DriveWay MyWay - <em>Your destination awaits</em>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' style={{'font-family': 'Arial'}}>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                <Search/> Search For a Parking Spot
              </Nav.Link>
              {/* if user is logged in show oderHistory and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/orderHistory'>
                    <ClockHistory/> Order History
                  </Nav.Link>
                  {/* Adds Post Driveway menu */}
                  <Nav.Link as={Link} to='/post'>
                    <Calendar2Plus/> Post Driveway</Nav.Link>
                  <Nav.Link as={Link} to='/profile'>
                    <Person/> Profile</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>
                    <Lock/> Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  <Key /> Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='tabs'>
                <Nav.Item>
                  <Nav.Link eventKey='login' className="text-success">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup' className="text-success">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
}

export default AppNavbar;

// function showNavigation() {
  //   if (Auth.loggedIn()) {
  //     return (
  //       <ul className="flex-row">
  //         <li className="mx-1">
  //           <Link to="/orderHistory">
  //             Order History
  //           </Link>
  //         </li>
  //         <li className="mx-1">
  //           {/* this is not using the Link component to logout or user and then refresh the application to the start */}
  //           <a href="/" onClick={() => Auth.logout()}>
  //             Logout
  //           </a>
  //         </li>
  //       </ul>
  //     );
  //   } else {
  //     return (
  //       <ul className="flex-row">
  //         <li className="mx-1">
  //           <Link to="/signup">
  //             Signup
  //           </Link>
  //         </li>
  //         <li className="mx-1">
  //           <Link to="/login">
  //             Login
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   }
  // }

  // return (
  //   <header className="flex-row px-1">
  //     <h1>
  //       <Link to="/">
  //         <span role="img" aria-label="shopping bag">🛍️</span>
  //         -Shop-Shop
  //       </Link>
  //     </h1>

  //     <nav>
  //       {showNavigation()}
  //     </nav>
  //   </header>
  // );