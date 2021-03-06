import React from 'react';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';

// Components
import RequestedDetailsDialog from '../components/dialog-boxes/requested-details-dialog';
import ConfirmedDetailsDialog from '../components/dialog-boxes/confirmed-details-dialog';
import { Icons } from '../icon-library';
import Loader from '../components/loader';

// Services
import { getUser, getUserImage } from '../services/user-service';
import { getConfirmedRides, getRequestedRides, getRideByID } from '../services/ride-service';
import { getDate, getTime } from '../services/date-service';
import { deleteRequestByID } from '../services/request-service';

/**
 * This page allows a user to manage anything having to do with their
 * role as a passenger. This means displaying a user's requested rides
 * and the rides where they are confirmed as a passenger.
 * It also allows a user to navigate to the search page to find
 * rides they might want to be a passenger on.
 */
class PassengerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      user: null,
      confirmedRides: null,
      requestedRides: null,
      loading: true
    };

    this.rideDictionary = [];
  }

  componentWillMount() {
    // Once the component mounts, make sure the tab matches the component
    this.props.matchTab();
    this.loadUserData();
  }

  // Return the index of the dictionary element containing the Ride
  searchRideDictionary = (rideID) => {
    for (let i = 0; i < this.rideDictionary.length; i++) {
      if (this.rideDictionary[i].value.rideID === rideID) {
        return i;
      }
    }
    return false;
  }

  // If delete was clicked on a dialog, delete the associated request
  // and reload user data
  deleteRequest = async (requestID) => {
    await deleteRequestByID(requestID);
    this.loadUserData();
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (<Loader />);
    }
    else {
      content = (
        <div>
          {/* List of confirmed rides generated from an array */}
          <h3 style={{ marginBottom: '0em' }}>
            Confirmed Rides ({this.state.confirmedRides.length})
          </h3>
          <List dense={this.state.dense}>
            {this.state.confirmedRides.map((confirmedRide) => {
              return (
                <ListItem
                  button
                  onClick={() => { this.confirmedDetailsDialogChild.handleClickOpen(confirmedRide, this.state.user.username) }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >

                  {/* Driver profile picture */}
                  <Avatar src={confirmedRide.driverPhoto} />

                  {/* Route destination and date range */}
                  <ListItemText
                    primary={confirmedRide.origin  + " ➜ " + confirmedRide.destination}
                    secondary={this.state.secondary ? getDate(confirmedRide.departureDateTime) + " " + getTime(confirmedRide.departureDateTime) : null}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* List of requests generated from an array */}
          <h3 style={{ marginTop: '2em', marginBottom: '0em' }}>
            Requested Rides ({this.state.requestedRides.length})
          </h3>

          <List dense={this.state.dense}>
            {this.state.requestedRides.map((requestedRide) => {

              // Get the Request's associated Ride, if it exists
              let index = this.searchRideDictionary(requestedRide.rideID);
              let linkedRide = this.rideDictionary[index].value;

              return (
                <ListItem
                  button
                  onClick={() => { this.requestedDetailsDialogChild.handleClickOpen(requestedRide, this.state.user.username) }}
                  disableGutters={this.state.noGutters}
                  divider={this.state.divider}
                >

                  {/* Driver profile picture */}
                  <Avatar src={requestedRide.driverPhoto} />

                  {/* Route destination and date range */}
                  <ListItemText
                    primary={linkedRide.origin + " ➜ " + linkedRide.destination}
                    secondary={this.state.secondary ? getDate(linkedRide.departureDateTime) + " " + getTime(linkedRide.departureDateTime): null}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Add a request button */}
          <Grid container>
            <Grid item xs={12}>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item>
                  <Link to="/passenger/search">
                    <Button variant="fab" color="secondary" aria-label="add">
                      {Icons.searchIcon}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Dialog boxes */}
          <RequestedDetailsDialog
            onDelete={this.deleteRequest}
            ref={(requestedDetailsDialogInstance) => { this.requestedDetailsDialogChild = requestedDetailsDialogInstance }} />
          <ConfirmedDetailsDialog
            onDelete={this.deleteRequest}
            ref={(confirmedDetailsDialogInstance) => { this.confirmedDetailsDialogChild = confirmedDetailsDialogInstance }} />

        </div>
      );
    }

    return (<div>{content}</div>)
  }

  /**
   * Load user data - grabbing from 360
   */
  async loadUserData() {
    this.setState({ loading: true });
    try {
      let data = await getUser();
      this.setState({ user: data });

      // Set confirmedRides to empty array if promise is rejected
      let confirmedRidesData = await getConfirmedRides(this.state.user.username);
      this.setState({ confirmedRides: confirmedRidesData });

      // Set requestedRides to empty array if promise is rejected
      let requestedRidesData = await getRequestedRides(this.state.user.username);
      this.setState({ requestedRides: requestedRidesData });

      // Link Requests to their linked Rides, if they exist
      let linkedRide;
      for (let i = 0; i < this.state.requestedRides.length; i++) {
        linkedRide = await getRideByID(this.state.requestedRides[i].rideID)
        if (linkedRide !== (null || undefined)) {
          // Has linked Ride
          this.rideDictionary.push({
            key: this.state.requestedRides[i].requestId,
            value: linkedRide
          });
        } else {
          // No linked Ride
          this.rideDictionary.push({
            key: this.state.requestedRides[i].requestId,
            value: false
          });
        }
      }

      // Get driver profile pictures for confirmed and requested rides
      if (this.state.confirmedRides.length > 0) {
        for (let rideIndex in this.state.confirmedRides) {
          let ride = this.state.confirmedRides[rideIndex];
          let photo = await getUserImage(ride.driverUsername);
          ride.driverPhoto = photo;
        }
      }

      if (this.state.requestedRides.length > 0) {
        for (let rideIndex in this.state.requestedRides) {
          let ride = this.state.requestedRides[rideIndex];
          let photo = await getUserImage(ride.driverUsername);
          ride.driverPhoto = photo;
        }
      }
      
      this.setState({ loading: false });
    }
    catch (err) {
      throw err;
    }
  };
}

PassengerPage.propTypes = {
  matchTab: PropTypes.func.isRequired,
};

export default PassengerPage;