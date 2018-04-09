import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemAvatar,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';

// Components
import { Icons } from '../../icon-library';

// Services
import { addRideOffer } from "../../services/ride-service";

/* Add an offer dialog box */
class AddOfferDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
      // Dialog box values
      originValue: null,
      destinationValue: null,
      dateValue: null,
      timeValue: null,
      maxCapacityValue: 1,
      driverNoteValue: null
    };
  }

  constants = {
    SEAT_MAX: 9, // Maximum number of available seats allowed in a given offer
  };

  // Open the add offer dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the add offer dialog
  handleClose = (confirmSelected) => {
    if (confirmSelected) {
      addRideOffer(, origin, destination, );
    }
    this.setState({ display: false });
  };

  // Limits seat maximum to pre-defined constant
  handleSeatPlus = () => {
    if (this.state.maxCapacityValue < this.constants.SEAT_MAX) { this.setState({ maxCapacityValue: this.state.maxCapacityValue + 1 }) }
  }

  // Limits seat minimum to 1
  handleSeatMinus = () => {
    if (this.state.maxCapacityValue > 1) { this.setState({ maxCapacityValue: this.state.maxCapacityValue - 1 }) }
  }

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add a ride offer:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {/* Ride info input */}
            <List dense={this.state.dense} style={{ padding: '0px' }} >

              {/* Origin */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.originIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Origin)"
                />
              </ListItem>

              {/* Destination */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.destinationIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="(Destination)"
                />
              </ListItem>

              {/* Date */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.dateIcon}
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField value={this.state.dateValue} required type="date" />
                </div>
              </ListItem>

              {/* Time */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.timeIcon}
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField value={this.state.timeValue} required type="time" />
                </div>
              </ListItem>

              {/* Number of seats */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.seatIcon}
                  </Avatar>
                </ListItemAvatar>
                <IconButton onClick={this.handleSeatMinus} >
                  {Icons.leftArrowIcon}
                </IconButton>
                {this.state.seats}
                <IconButton onClick={this.handleSeatPlus} >
                  {Icons.rightArrowIcon}
                </IconButton>
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <div style={{ paddingLeft: "1em" }} >
                  <TextField value={this.state.driverNoteValue} label="Note to passengers" multiline={true} />
                </div>
              </ListItem>
            </List>

          </DialogContentText>

        <hr/>

        {/* Action buttons */}
        <Grid container spacing={40} justify="center">
          <Grid item>
            <IconButton onClick={() => this.handleClose(false)}>
              {Icons.exitIcon}
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={() => this.handleClose(true)}>
              {Icons.confirmIcon}
            </IconButton>
          </Grid>
        </Grid>

        </DialogContent>

      </Dialog>
    );
  }
}

export default AddOfferDialog;