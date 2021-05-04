import React from 'react';
import axios from 'axios';
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      description: '',
      email: '',
      books: [],
      name: ''
    }
  }
  handleEmailInput = (e) => {
    this.setState({email: e.target.value});
  }
  handleNameInput = (e) => {
    this.setState({name: e.target.value});
  }
  handleDescriptionInput = (e) => {
    this.setState({description: e.target.value});
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.fetchUserData();
  }

  fetchUserData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${this.props.auth0.user.email}`)
    .then(serverResponse => {
      console.log(serverResponse.data);
      this.setState({
        books: serverResponse.data[0].books
      })
    });
  }

  handleCreateBook = (e) => {
    e.preventDefault();
    console.log('name', this.state.name, 'email', this.props.auth0.user.email, 'description', this.state.description);
    // make the request to the server with the info the user typed in
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/books`, {
      description: this.state.description,
      email: this.props.auth0.user.email,
      name: this.state.name
    }).then( response => {
      console.log(response.data);
      this.setState({
        books: response.data
      })
    });
  }

  handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/books/${id}?user=${this.props.auth0.user.email}`).then(responseData => {
      this.setState({ 
        books: responseData.data
      })
    })
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/`)
    .then(serverResponse => console.log(serverResponse.data));
  }
  render() {
    return <>
      <h1>New Books!</h1>
      <form onSubmit={this.handleFormSubmit}>
        <input type="text" onInput={this.handleEmailInput} />
        <input type="submit" />
      </form>
      {this.state.books.length > 0 && <ul>
        {this.state.books.map(book => 
          <li key={book._id}>{book.name}: {book.description} <button onClick={e => this.handleDelete(book._id)} >Delete</button></li>
        )}
        </ul>}
      <form onSubmit={this.handleCreateBook}>
        <label htmlFor="name">Book Name</label>
        <input id="name" type="text" onInput={this.handleNameInput}></input>
        <br />
        <label htmlFor="description">Book Description</label>
        <input id="description" onInput={this.handleDescriptionInput}></input>
        <br />
        <input type="submit" />
      </form>
    </>
  }
}
export default withAuth0 (BookForm);