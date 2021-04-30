import React from 'react';
import './App.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
// import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhotst:3001';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = async() => {
    const {user} = this.props.auth0;
      console.log('about to request book data');
      const bookData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/book?user=${user.userEmail}`
      )
      console.log('found it', bookData)
      this.setState({
        books: bookData.data.favoriteBooks
      });
    }
  render(){
    
    return(
      <>
        <h1>Books</h1>
        {this.state.books && this.state.books.map(book => <h3 key={book._id}>{book.bookName}</h3>)}
      </>
    )
  }
}

export default withAuth0(BestBooks);
