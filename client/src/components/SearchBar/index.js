import { Jumbotron, Container, Col, Form, Button, Row } from 'react-bootstrap';

/* Results Page */
import { Navigate, useNavigate } from 'react-router-dom';

import {CompassFill} from 'react-bootstrap-icons'

const SearchBar = () => {
  /* Results Page */
  const navigate = useNavigate();

  const handleSearchBtn = async (event) => {
    const { value } = event.target[0];
    event.preventDefault();
    console.log('Search Clicked!!!!');
    console.log('ZIP CODE : event.value', value);
    navigate(`/results/${value}`);
  };

  return (
    <>
      <Jumbotron>
        <Container fluid>
          <Row>
            <h3>Search a Zipcode</h3><CompassFill/>
          </Row>
          {/* Results Page */}
          <Form onSubmit={handleSearchBtn} >
            <Row>
              <Col>
                <Form.Control
                  name='searchInput'
                  type='text'
                  size='md'
                  placeholder='Search for a zipcode'
                /> 
              </Col>
              <Col sm={12}>
                <Button type='submit' variant='success' size='md'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default SearchBar;