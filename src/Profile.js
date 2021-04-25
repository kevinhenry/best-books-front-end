import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Container>
          <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" style={{ width: '15rem' }} src={user.picture} alt={user.picture} />
            <Card.Body>
              <Card.Title>{user.name}'s Profile</Card.Title>
              <Card.Text>
                <p>{user.email}</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
        {/* <h2>{user.name}</h2>
        <p>{user.email}</p> */}
      </div>
    )
  );
}

export default Profile;