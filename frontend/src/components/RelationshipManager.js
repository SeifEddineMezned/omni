import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  People,
  Phone,
  Email,
  Cake,
  Event,
} from '@mui/icons-material';

const RelationshipManager = () => {
  const contacts = [
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'Close Friend',
      lastContact: '2024-01-10',
      birthday: '1992-03-15',
      email: 'sarah@email.com',
      phone: '+1 555-0123',
      notes: 'Loves hiking and photography',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Mike Chen',
      relationship: 'Colleague',
      lastContact: '2024-01-08',
      birthday: '1988-07-22',
      email: 'mike@company.com',
      phone: '+1 555-0456',
      notes: 'Great at React development',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emily Davis',
      relationship: 'Family',
      lastContact: '2024-01-12',
      birthday: '1985-12-03',
      email: 'emily@email.com',
      phone: '+1 555-0789',
      notes: 'Sister, lives in Portland',
      avatar: 'ED',
    },
  ];

  const upcomingEvents = [
    {
      type: 'birthday',
      person: 'Sarah Johnson',
      date: '2024-03-15',
      daysAway: 45,
    },
    {
      type: 'anniversary',
      person: 'Work Anniversary - Mike Chen',
      date: '2024-02-01',
      daysAway: 18,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <People sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Relationship Manager
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Contacts List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contacts
              </Typography>
              <List>
                {contacts.map((contact) => (
                  <ListItem key={contact.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {contact.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {contact.name}
                          </Typography>
                          <Chip size="small" label={contact.relationship} variant="outlined" />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Email sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{contact.email}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Phone sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{contact.phone}</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {contact.notes}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last contact: {contact.lastContact}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {upcomingEvents.map((event, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {event.type === 'birthday' ? <Cake /> : <Event />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={event.person}
                      secondary={`${event.date} (${event.daysAway} days)`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="primary.main">
                  {contacts.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Contacts
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary.main">
                  {upcomingEvents.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Upcoming Events
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RelationshipManager;
