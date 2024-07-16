import React from 'react';
import { useState } from 'react';
import { Box, Typography, Avatar, TextField, List, ListItem, ListItemAvatar, ListItemText, Divider,Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const SrcDashboard = () => {
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  const dummyData = [
    { id: 1, title: 'Data Point 1', description: 'Description for data point 1' },
    { id: 2, title: 'Data Point 2', description: 'Description for data point 2' },
    { id: 3, title: 'Data Point 3', description: 'Description for data point 3' },
  ];

  const friends = [
    { id: 1, name: 'Friend 1', profilePic: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Friend 2', profilePic: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Friend 3', profilePic: 'https://via.placeholder.com/40' },
  ];

  /*const handleSearch = async () => {
    const tempUsername =  searchQuery.toLowerCase();
    try {
      const res = await auth?.getuser(tempUsername);
      console.log('Searching page = ', res);
      navigate(`/profile/${tempUsername}`);
    } catch (error) {
      console.log(error);
     // toast.error("Search failed", { id: "login" });
    }
   
  };*/

  return (
    <Box display="flex" height="100vh" bgcolor="#f0f4f8">
      {/* Profile Box */}
      <Box
        width={{ xs: '30%', sm: '25%', md: '20%' }}
        bgcolor="grey"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        padding={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="10px"
      >
        <Avatar src={user?.profilePic} alt={auth.currentDashboard} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h6" fontWeight={600} color="#00796b" textAlign="center">
          {auth.currentDashboard}
        </Typography>
      </Box>

      {/* Dummy Data Box */}
      <Box
        flex={1}
        padding={4}
        display="flex"
        flexDirection="column"
        gap={2}
        bgcolor="white"
        boxShadow="10px 10px 20px #000"
        borderRadius="10px"
        marginX={2}
      >

        {/* Dummy Data */}
        <Box>
          <Typography variant="h5" marginBottom={2}>
            Dashboard Data
          </Typography>
          {dummyData.map((data) => (
            <Box key={data.id} mb={2} p={2} bgcolor="#f0f0f0" borderRadius={2}>
              <Typography variant="h6">{data.title}</Typography>
              <Typography>{data.description}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SrcDashboard;
