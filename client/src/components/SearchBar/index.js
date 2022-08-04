import { Jumbotron, Container, Col, Form, Button } from 'react-bootstrap';

/* Results Page */
import { Navigate, useNavigate } from 'react-router-dom';

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
      <Jumbotron >
        <Container>
          <h3>Search a Zipcode!</h3>
          {/* Results Page */}
          <Form onSubmit={handleSearchBtn} >
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