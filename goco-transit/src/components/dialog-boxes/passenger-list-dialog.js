import React from 'react';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemText,
  ListItemAvatar
} from 'material-ui/List';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Badge from 'material-ui/Badge';

// Components
import { Icons } from '../../icon-library';

// Services
import { getUserImage, getUserFullName } from '../../services/user-service';

/* This dialog opens on the driver page of the app
   It displays more information about a ride which a user
   has offered to other users */
class PassengerListDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      dense: false,
      secondary: true,
      noGutters: true,
      divider: false,
      display: false,
      confirmedRequests: [],
      pendingRequests: [],
      confirmedListItemExpansion: [],
      pendingListItemExpansion: []
    };
  }

  // Open the add offer dialog
  handleClickOpen = async (requests) => {
    // Reset arrays to being empty
    this.setState({
      confirmedRequests: [],
      pendingRequests: [],
      confirmedListItemExpansion: [],
      pendingListItemExpansion: []
    });
    
    // Sort Requests by confirmation status
    for (let request in requests) {
      if (requests[request].isConfirmed) {
        this.state.confirmedRequests.push({
          request: requests[request],
          profilePic: 'data:image/png;base64,' + (await getUserImage(requests[request].requesterUsername)).def,
          index: this.state.confirmedRequests.length
        });
        this.state.confirmedListItemExpansion.push(false);
      } else {
        this.state.pendingRequests.push({
          request: requests[request],
          profilePic: 'data:image/png;base64,' + (await getUserImage(requests[request].requesterUsername)).def,
          index: this.state.pendingRequests.length
        });
        this.state.pendingListItemExpansion.push(false);
      }
    } 
    
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Passengers"}</DialogTitle>
        
        {this.state.display && // Don't attempt to get undefined data
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            
              <h4 style={{ marginTop: '0em', marginBottom: '0em' }}>
                Confirmed ({this.state.confirmedRequests.length})
              </h4>

              {/* List of confirmed passengers */}
              <List dense={this.state.dense}>
                {this.state.confirmedRequests.map((confirmedRequest) => {
                  return (
                    <ExpansionPanel elevation={0}>
                      <ExpansionPanelSummary expandIcon={Icons.expandIcon} style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                        >
                          <ListItemAvatar>
                            <Avatar src={confirmedRequest.profilePic}/>
                          </ListItemAvatar>
                          <div style={{ paddingLeft: '1.5em' }}>
                            <ListItemText primary={getUserFullName(confirmedRequest.request.requesterUsername)}/>
                          </div>
                        </ListItem>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                          style={{ paddingTop: '1em' }}
                        >
                          <ListItemAvatar>
                            <Badge badgeContent={
                              <IconButton
                                disabled
                                style={{
                                  backgroundColor: '#BDBDBD',
                                  color: '#FFFFFF',
                                  width: '1.25em',
                                  height: '1.25em'
                              }}>
                                {Icons.seatIcon}
                              </IconButton>}>
                              <Avatar>
                                {Icons.noteIcon}
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <div style={{ paddingLeft: '1.5em' }}>
                            <ListItemText primary={confirmedRequest.request.requesterNote}/>
                          </div>
                        </ListItem>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
              </List>

              <hr/>
              
              <h4 style={{ marginTop: '1em', marginBottom: '0em' }}>
                Requested ({this.state.pendingRequests.length})
              </h4>
              
              {/* List of potential passengers */}
              <List dense={this.state.dense}>
                {this.state.pendingRequests.map((pendingRequest) => {
                  return (
                    <ExpansionPanel elevation={0}>
                      <ExpansionPanelSummary expandIcon={Icons.expandIcon} style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                        >
                          <ListItemAvatar>
                            <Avatar src={pendingRequest.profilePic}/>
                          </ListItemAvatar>
                          <div style={{ paddingLeft: '1.5em' }}>
                            <ListItemText primary={getUserFullName(pendingRequest.request.requesterUsername)}/>
                          </div>
                        </ListItem>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails style={{ padding: 0 }}>
                        <ListItem
                          disableGutters={this.state.noGutters}
                          divider={this.state.divider}
                          style={{ paddingTop: '1em' }}
                        >
                          <ListItemAvatar>
                            <Badge badgeContent={
                              <IconButton
                                disabled
                                style={{
                                  backgroundColor: '#BDBDBD',
                                  color: '#FFFFFF',
                                  width: '1.25em',
                                  height: '1.25em'
                              }}>
                                {Icons.seatIcon}
                              </IconButton>}>
                              <Avatar>
                                {Icons.noteIcon}
                              </Avatar>
                            </Badge>
                          </ListItemAvatar>
                          <div style={{ paddingLeft: '1.5em' }}>
                            <ListItemText primary={pendingRequest.request.requesterNote}/>
                          </div>
                        </ListItem>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  )
                })}
              </List>

            </DialogContentText>

            <hr/>

            {/* Action buttons */}
            <Grid container spacing={40} justify="center">
              <Grid item>
                <IconButton onClick={this.handleClose}>
                  {Icons.exitIcon}
                </IconButton>
              </Grid>
            </Grid>

          </DialogContent>
        }
      </Dialog>
    );
  }
}

export default PassengerListDialog;