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
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import { Icons } from '../icon-library';
import ConfirmationDialog from '../components/confirmation-dialog';

/* Add an offer dialog box */
class RequestedDetailsDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: true,
      display: false,
    };
  }

  // Open the add offer dialog
  handleClickOpen = () => {
    this.setState({ display: true });
  };

  // Close the add offer dialog
  handleClose = () => {
    this.setState({ display: false });
  };

  render() {
    return (
      <Dialog
        open={this.state.display}
        onClose={this.handleClose}
        disableBackdropClick={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Ride Request Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            {/* Requested ride details */}
            <List dense={this.state.dense} style={{ padding: '0px' }} >

              {/* Origin */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.originIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Origin)" />
              </ListItem>

              {/* Destination */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.destinationIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Destination)" />
              </ListItem>

              {/* Start of availability range */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    TBD
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Start)" />
              </ListItem>

              {/* End of availability range */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    TBD
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(End)" />
              </ListItem>

              {/* Notes */}
              <ListItem disableGutters={this.state.noGutters} divider={this.divider}>
                <ListItemAvatar>
                  <Avatar>
                    {Icons.noteIcon}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="(Note to driver)" />
              </ListItem>
            </List>

          </DialogContentText>

          <hr/>

          {/* Action buttons */}
          <Grid container spacing={40} justify="center">
            <Grid item>
              <IconButton>
                <Badge color="primary">
                  {Icons.seatIcon}
                </Badge>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={this.handleClose}>
                {Icons.exitIcon}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => { this.confirmationDialogChild.handleClickOpen(
                "Delete this ride request?", "You will be removed from the waiting list."); }}
              >
                {Icons.deleteIcon}
              </IconButton>
            </Grid>
          </Grid>

        </DialogContent>

        {/* Dialog boxes */}
        <ConfirmationDialog ref={(confirmationDialogInstance) => { this.confirmationDialogChild = confirmationDialogInstance; }} />

      </Dialog>
      
    );
  
  }
}

export default RequestedDetailsDialog;