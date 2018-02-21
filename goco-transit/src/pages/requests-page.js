import React from 'react';
import DoneIcon from 'material-ui-icons/Done';
import DeleteIcon from 'material-ui-icons/Delete';
import QuestionIcon from 'material-ui-icons/Help';
import PersonIcon from 'material-ui-icons/Person';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { Link } from 'react-router-dom';

// Components
import RequestSearchPage from './request-search-page';

// Services
import { getUser } from '../services/user-service';

// Contains ride requests made by the user
class RequestsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      open: false,
      user: null,
      rides: null,
      requests: null
    };

    this.state.user = getUser();
    this.state.requests = this.state.user.requests;
    this.state.rides = this.state.user.rides;
  }

  // Open the delete dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Close the delete dialog
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* List of rides generated from an array */}
        <h3>
          Rides
        </h3>
        <List dense={this.state.dense}>
          {this.state.rides.map((ride) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    <DoneIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={ride.destination}
                  secondary={this.state.secondary ? ride.date : null}
                />
                {/* Delete button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* List of requests generated from an array */}
        <h3 style={{ marginTop: '3em' }}>
          Requests
        </h3>

        <List dense={this.state.dense}>
          {this.state.requests.map((request) => {
            return (
              <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
                <ListItemAvatar>
                  {/* Depending on whether the user has been accepted as a passenger
                  A different avatar will be displayed */}
                  <Avatar>
                    <QuestionIcon />
                  </Avatar>
                </ListItemAvatar>
                {/* Route destination and date range */}
                <ListItemText
                  primary={request.destination}
                  secondary={this.state.secondary ? (request.dateMin + '-' + request.dateMax) : null}
                />
                {/* Delete button */}
                <ListItemSecondaryAction>
                  <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>

        {/* Add a request button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Link to="/requests/search">
                  <Button variant="fab" color="secondary" aria-label="add">
                    <AddIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete a request dialog box */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this ride request?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              (Ride data will go here)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Back
            </Button>
            <Button onClick={this.handleClose}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RequestsPage;