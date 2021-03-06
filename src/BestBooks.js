import React from 'react';
import './App.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Carousel } from 'react-bootstrap';
// import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookDescription: '',
      email: '',
      books: [],
      bookName: '',
      updatingBook: '',
      isUpdating: false
    }
  }

  componentDidMount = async() => {
    const {user} = this.props.auth0;
      console.log('user', user);
      // *** There was a problem with this URL caused a /book that was already in the .env ***
      const bookData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/?user=${user.email}`
      )
      console.log('found it', bookData)
      this.setState({
        books: bookData.data,
      });
    }
  render(){
    // const data = this.state.bookList.length > 0 && this.state.bookList[0].bookData;
    return(
      <Container>
          <Carousel>
          {this.state.books.map(book =>
            <Carousel.Item key={book._id}>
              <img
                className="d-block w-100"
                src={'https://via.placeholder.com/300x300'}
                // src={'img/Dracula-2.jpeg/300x300'}
                alt={book.bookName}
              />
              <Carousel.Caption>
                <div>
                  <h3>{book.bookName}</h3>
                  <p>{book.bookDescription}</p>
                  <p>{book.bookStatus}</p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>
      </Container>
    );
  }
}

export default withAuth0(BestBooks);
