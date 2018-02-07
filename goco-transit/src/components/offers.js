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

// Contains rides offered to other users
class Offers extends React.Component {
  state = {
    dense: false,
    secondary: true,
    noGutters: true,
    divider: true,
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* List of offers - items display the number of users who have accepted the ride */}
        <List dense={this.state.dense}>
          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <IconButton disabled={true}>
                <Badge badgeContent={4} color="primary">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary="Scranton"
              secondary={this.state.secondary ? '2/3/18' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button disableGutters={this.state.noGutters} divider={this.state.divider}>
            <ListItemAvatar>
              <IconButton disabled={true}>
                <Badge badgeContent={2} color="primary">
                  <PersonIcon />
                </Badge>
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary="Boston"
              secondary={this.state.secondary ? '4/6/18' : null}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClickOpen} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        {/* Add Offer Button */}
        <Grid container>
          <Grid item xs={12}>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <Button fab color="secondary" aria-label="add">
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Delete an offer dialog box */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this ride offer?"}</DialogTitle>
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

export default Offers;