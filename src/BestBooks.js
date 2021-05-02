import React from 'react';
import './App.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import BookForm from './BookForm';
// import MyFavoriteBooks from './MyFavoriteBooks';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
    };
  }

  componentDidMount = async() => {
    const {user} = this.props.auth0;
      console.log('user', user);
      const bookData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book?user=${user.email}`
      )
      console.log('found it', bookData)
      this.setState({
        bookList: bookData.data,
      });
    }
  render(){
    const data = this.state.bookList.length > 0 && this.state.bookList[0].bookData;
    return(
      <>
        <BookForm list={this.state.bookList} />

        <div>
          {this.state.bookList.lenth > 0?
            <Container>
              <Carousel>
              {data.map((book, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-100"
                    src={'https://via.placeholder.com/300x300'}
                    alt={book.name}
                    />
                  <Carousel.Caption>
                    <h3>{book.name}</h3>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
              </Carousel>
            </Container>
              :'Your favorite books'
              }
        </div>
      </>
    )
  }
}

export default withAuth0(BestBooks);
