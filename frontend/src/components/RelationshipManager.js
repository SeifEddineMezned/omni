import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  People,
  Phone,
  Email,
  Cake,
  Event,
} from '@mui/icons-material';

const RelationshipManager = () => {
  const [contacts, setContacts] = useState([
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
  ]);

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

  const [open, setOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleAddContact = () => {
    if (!newContact.name) return;

    setContacts([
      ...contacts,
      {
        id: Date.now(),
        ...newContact,
        avatar: newContact.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase(),
        lastContact: new Date().toISOString().split('T')[0],
      },
    ]);

    setNewContact({
      name: '',
      relationship: '',
      email: '',
      phone: '',
      notes: '',
    });
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <People sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4">Relationship Manager</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Contacts */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6">Contacts</Typography>
                <Button variant="contained" onClick={() => setOpen(true)}>
                  Add Contact
                </Button>
              </Box>

              <List>
                {contacts.map(contact => (
                  <ListItem key={contact.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {contact.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant="subtitle1">
                            {contact.name}
                          </Typography>
                          <Chip size="small" label={contact.relationship} />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Email sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              {contact.email}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Phone sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                              {contact.phone}
                            </Typography>
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

        {/* Right Side */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <List>
                {upcomingEvents.map((event, i) => (
                  <ListItem key={i}>
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

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="primary">
                  {contacts.length}
                </Typography>
                <Typography color="text.secondary">
                  Total Contacts
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="secondary">
                  {upcomingEvents.length}
                </Typography>
                <Typography color="text.secondary">
                  Upcoming Events
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Contact Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Add New Contact</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={newContact.name}
            onChange={e => setNewContact({ ...newContact, name: e.target.value })}
          />
          <TextField
            label="Relationship"
            value={newContact.relationship}
            onChange={e =>
              setNewContact({ ...newContact, relationship: e.target.value })
            }
          />
          <TextField
            label="Email"
            value={newContact.email}
            onChange={e => setNewContact({ ...newContact, email: e.target.value })}
          />
          <TextField
            label="Phone"
            value={newContact.phone}
            onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
          />
          <TextField
            label="Notes"
            multiline
            rows={2}
            value={newContact.notes}
            onChange={e => setNewContact({ ...newContact, notes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddContact}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RelationshipManager;
