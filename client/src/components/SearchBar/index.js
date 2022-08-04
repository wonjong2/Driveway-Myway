import { Jumbotron, Container, Col, Form, Button } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <>
      <Jumbotron >
        <Container>
          <h3>Search a Zipcode!</h3>
          <Form >
            <Form.Row>
              <Col >
                <Form.Control
                  name='searchInput'
                  type='text'
                  size='md'
                  placeholder='Search for a zipcode'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='md'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
    </>
  );
};

export default SearchBar;