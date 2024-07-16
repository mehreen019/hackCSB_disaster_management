import React from 'react';
import { Box, Typography, Avatar, TextField, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const auth = useAuth();
  const user = auth?.user;

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

  return (
    <Box display="flex" height="100vh" bgcolor="#e0f7fa">
      {/* Profile Box */}
      <Box
        width={{ xs: '30%', sm: '25%', md: '20%' }}
        bgcolor="grey"
        boxShadow="10px 10px 20px #000"
        padding={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Avatar src={user?.profilePic} alt={user?.username} sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography variant="h6" fontWeight={600} color="#00796b" textAlign="center">
          {user?.username}
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
        {/* Search Box */}
        <TextField
          variant="outlined"
          placeholder="Search users..."
          fullWidth
          sx={{ marginBottom: 4 }}
        />

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

      {/* Friends Box */}
      <Box
        width={{ xs: '30%', sm: '25%', md: '20%' }}
        bgcolor="white"
        boxShadow="10px 10px 20px #000"
        padding={4}
        display="flex"
        flexDirection="column"
        borderRadius="10px"
      >
        <Typography variant="h5" marginBottom={2}>
          Friends
        </Typography>
        <List>
          {friends.map((friend) => (
            <React.Fragment key={friend.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={friend.profilePic} alt={friend.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={<NavLink to={`/profile/${friend.id}`} style={{ textDecoration: 'none', color: '#00796b' }}>{friend.name}</NavLink>}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
