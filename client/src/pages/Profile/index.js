import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import {Text,Button} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Profile({history}) {
  const { user , logout } = useAuth();
const navigate =useNavigate();
  const handleLogout = async () => { await
   logout(() => navigate("/"));
  };

  return (
    <div>
    <Text fontSize="22">Profile</Text>
      <code>{JSON.stringify(user)}</code>

      <Button mt={4} colorScheme="pink" variant="solid" onClick={handleLogout} >
        Logout
      </Button>
    </div>
  )
}

export default Profile
